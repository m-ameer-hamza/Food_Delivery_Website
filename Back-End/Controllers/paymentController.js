import appError from "../error.js";
import axios from "axios";
import { Stripe } from "stripe";

import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

// Simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../config.env") });

//create a new stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function convertToUSDInCents(amount, currency) {
  try {
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/USD`
    );
    const rate = response.data.rates;
    const amountInUSD = amount * rate;

    const convertedAmount = parseFloat(amount) / rate[currency.toUpperCase()];

    const amountInCents = Math.floor(convertedAmount * 100);

    return amountInCents;
  } catch (error) {
    console.log("Error converting to USD and cents", error);
    throw new appError("Error converting currency", 500);
  }
}

export async function createPaymentIntent(req, res, next) {
  try {
    const { amount, currency } = req.body;
    //check if amount and currency are provided
    if (!amount || !currency) {
      return next(new appError("Amount and currency are required", 400));
    }
    const amountInCents = await convertToUSDInCents(amount, currency);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
    });

    //check if client secret is created
    if (!paymentIntent.client_secret) {
      return next(new appError("Error setting up the card", 503));
    }

    console.log("Payment intent created", paymentIntent);
    res.status(200).json({
      status: "success",
      message: "Payment intent created",
      paymentIntent,
    });
  } catch (error) {
    console.log("Error creating payment intent", error);
    next(new appError("Error creating payment intent", 500));
  }
}
