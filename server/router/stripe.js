import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.post("/payment", async (req, res) => {
  try {
    await stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
      },
      (stripeError, stripeRes) => {
        if (stripeError) {
        } else {
          return res.json(stripeRes);
        }
      }
    );
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;
