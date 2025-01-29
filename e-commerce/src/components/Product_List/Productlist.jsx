import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Announcement from '../Annoucmenet/Announcement'; // Fixed typo
import Product from '../Product/Product';
import Newsletter from '../Newsletter/Newsletter';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useLocation, useNavigate } from 'react-router-dom';
import { addProduct } from '../../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import { insertCart } from '../../redux/apiCall';
import { userRequest } from '../../requestMethod';

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-color: #FFF6F5;
`;

const SingleProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const ImgContainer = styled.div`
  flex: 1;
  padding: 40px;

  img {
    width: 840px;
    height: 700px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  padding: 40px;
  flex-direction: column;
  gap: 30px;
  flex: 1;
`;

const STitle = styled.span`
  font-size: 36px;
`;

const SDesc = styled.span`
  font-size: 23px;
  text-align: justify;
`;

const Color = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CTitle = styled.span`
  font-size: 25px;
  color: gray;
`;

const Circle = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const Size = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  select {
    width: 50px;
    height: 30px;
  }
`;

const Price = styled.div`
  font-size: 50px;
`;

const Button = styled.div`
  width: 130px;
  height: 45px;
  border: 2px solid green;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
const Productlist = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  // Move useSelector outside the function to follow hooks rules
  const userId = useSelector(state => state.user.currentUser._id);

  const [cart, setCart] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get(`/product/find/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantityChange = (type) => {
    setQuantity(prev => (type === "inc" ? prev + 1 : Math.max(prev - 1, 1)));
  };

  const handleClickCart = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  
  
      insertCart(dispatch, {
        userId,
        products: [{
          productId: id,
          quantity,
          size,
          color,
        }],
      });
      // console.log("Product added to cart:", { ...product, quantity, color, size }); // Log the added product details
   
  };
  
  console.log("Cart", cart);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <SingleProduct>
        <ImgContainer>
          <img src={product.img} alt={product.title} />
        </ImgContainer>
        <InfoContainer>
          <STitle>{product.title}</STitle>
          <SDesc>{product.desc}</SDesc>
          <Price>${product.price}</Price>
          <Color>
            <CTitle>Color</CTitle>
            {product.color?.map((colorOption) => (
              <Circle
                key={colorOption}
                color={colorOption}
                onClick={() => setColor(colorOption)}
              />
            ))}
          </Color>
          <Size>
            <CTitle>Size</CTitle>
            <select onChange={(e) => setSize(e.target.value)}>
              {product.size?.map((sizeOption) => (
                <option key={sizeOption} value={sizeOption}>
                  {sizeOption}
                </option>
              ))}
            </select>
          </Size>
          <div>
            <AddIcon onClick={() => handleQuantityChange("inc")} />
            <span>{quantity}</span>
            <RemoveIcon onClick={() => handleQuantityChange("dec")} />
          </div>
          <Button onClick={handleClickCart}>ADD TO CART</Button>
        </InfoContainer>
      </SingleProduct>
      <Product />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Productlist;


