import { useState, useEffect } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const PayAlll = () => {
  const [stripeToken, setStripeToken] = useState(null);

  useEffect(() => {
    const makeRequest = async () => {
      if (stripeToken) {
        try {
          const res = await axios.post("http://localhost:5000/api/checkout/payment", {
            tokenId: stripeToken.id,
            amount: 2000,
          });
          console.log("Payment success:", res.data);
        } catch (err) {
          console.log("Payment error:", err);
        }
      }
    };
    makeRequest();
  }, [stripeToken]); // Dependency array to trigger only when stripeToken changes

  const onToken = (token) => {
    setStripeToken(token);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StripeCheckout
        name="Lama Shop"
        image="https://avatars.githubusercontent.com/u/1486366?v=4"
        billingAddress
        shippingAddress
        description="Your total is $20"
        amount={2000}
        token={onToken}
        stripeKey="pk_test_51Px3QdRpBlEs6mjjd6yZOkVZqs9h0W0CueqtveEQkyuJ2nDGrHahXBSIdwBsJaYiQAyzVNFk4tRmYyPvRvuFWszM00nFFPOSnn"
      >
        <button
          style={{
            border: "none",
            width: 120,
            borderRadius: 5,
            padding: "20px",
            backgroundColor: "black",
            color: "white",
          }}
        >
          Pay Now
        </button>
      </StripeCheckout>
    </div>
  );
};

export default PayAlll;
