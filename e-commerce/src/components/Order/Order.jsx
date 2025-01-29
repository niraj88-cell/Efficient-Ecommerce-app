import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector } from 'react-redux';
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';
import { userRequest } from '../../requestMethod';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  height: max-content;
  overflow: hidden;
`;

const Title = styled.span`
  font-size: 45px;
`;

const Middle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 140px;
  height: 10vh;
  width: 100%;
`;

const Shop = styled.button`
  padding: 10px;
  border: 2px solid black;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
  a {
    color: black;
    font-size: 20px;
  }
`;

const CheckOut = styled.div`
  padding: 10px;
  background-color: black;
  color: white;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  padding-left: 20px;
  border-bottom: 1px solid lightgray;
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Color = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const Tag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 28px;
`;

const Price = styled.span`
  font-size: 35px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 60px;
  flex: 0.3;
`;

const Rtitle = styled.span`
  font-size: 45px;
`;

const SummarySection = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

const For = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 30px;
  }
`;

const Name = styled.div`
  font-size: 26px;
  span {
    font-weight: bold;
  }
`;

const ID = styled.div`
  font-size: 26px;
  span {
    font-weight: bold;
  }
`;

const Size = styled.div`
  font-size: 26px;
  span {
    font-weight: bold;
  }
`;

const Last = styled.button`
  padding: 15px;
  background-color: black;
  color: white;
  align-self: center;
  width: 420px;
`;

const Rawan = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border: 1px solid lightgray;
  border-radius: 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  img {
    width: 300px;
    height: auto;
  }
`;

const Order = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);
  const amount = total * 100;
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stripeToken, setStripeToken] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const productRequests = cart.map((p) => 
          userRequest.get(`http://localhost:5000/api/products/find/${p.productId}`)
        );

        const responses = await Promise.all(productRequests);
        const fetchedProducts = responses.map(response => response.data);
        
        setProductDetails(fetchedProducts);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [cart]);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const handleStripe = async () => {
      if (stripeToken) {
        try {
          const res = await axios.post("http://localhost:5000/api/checkout/payment", {
            token: stripeToken,
            amount,
          });
          console.log(res);
        } catch (error) {
          console.error("Payment error:", error);
        }
      }
    };

    handleStripe();
  }, [stripeToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>YOUR BAG</Title>
      <Middle>
        <Shop>CONTINUE SHOPPING</Shop>
        <Links>
          <a href="">Shopping Bag({cart.length})</a>
          <a href="">Your Wishlist(0)</a>
        </Links>
        <CheckOut>CHECKOUT NOW</CheckOut>
      </Middle>
      {cart.map((p) => {
        const productDetail = productDetails.find(detail => detail._id === p.productId);
        if (!productDetail) {
          return <div key={p.productId}>Loading product details...</div>;
        }
        return (
          <Bottom key={p.productId}>
            <Left>
              <Top>
                <InfoContainer>
                  <img src={productDetail.img} alt={productDetail.title} />
                  <Desc>
                    <Name>
                      <span>Product:</span> {productDetail.title}
                    </Name>
                    <ID>
                      <span>ID:</span> {productDetail._id}
                    </ID>
                    <Color color="black" />
                    <Size>
                      <span>Size:</span> {p.size}
                    </Size>
                  </Desc>
                </InfoContainer>
                <Tag>
                  <Icon>
                    <AddIcon />
                    {p.quantity}
                    <RemoveIcon />
                  </Icon>
                  <Price>${productDetail.price * p.quantity}</Price>
                </Tag>
              </Top>
            </Left>
            <Right>
              <Rawan>
                <Rtitle>ORDER SUMMARY</Rtitle>
                <SummarySection>
                  <span>Subtotal</span>
                  <p>${total}</p>
                </SummarySection>
                <SummarySection>
                  <span>Estimated Shipping</span>
                  <p>$5.90</p>
                </SummarySection>
                <SummarySection>
                  <span>Shipping Discount</span>
                  <p>$-5.90</p>
                </SummarySection>
                <For>
                  <h1>Total</h1>
                  <p>${total}</p>
                </For>
                <StripeCheckout
                  name="Lama Shop"
                  image="https://avatars.githubusercontent.com/u/1486366?v=4"
                  billingAddress
                  shippingAddress
                  description={`Your total is $${total}`}
                  amount={amount}
                  token={onToken}
                  stripeKey="pk_test_51Px3QdRpBlEs6mjjd6yZOkVZqs9h0W0CueqtveEQkyuJ2nDGrHahXBSIdwBsJaYiQAyzVNFk4tRmYyPvRvuFWszM00nFFPOSnn"
                >
                  <Last>CHECKOUT NOW</Last>
                </StripeCheckout>
              </Rawan>
            </Right>
          </Bottom>
        );
      })}
    </Container>
  );
};

export default Order;
