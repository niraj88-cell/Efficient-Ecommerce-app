const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51Px3QdRpBlEs6mjjlLRtxxQWDZtjpojexVjq4gmJ6y4RfyhwAG3hsTP2tOX5eM3zNzrgyJqW3e86P03I3s96vewS00OED1l79S"
);

router.post("/payment", async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
 