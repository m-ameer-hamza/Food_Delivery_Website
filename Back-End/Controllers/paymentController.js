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

export async function stripePayment(req, res, next) {
  try {
    const { items } = req.body; // Receive the cart items from the client

    if (!items || items.length === 0) {
      return next(new appError("No items in the cart", 400));
    }
    // Define your product details for Stripe Checkout
    const line_items = items.map((item) => ({
      price_data: {
        currency: "pkr",
        product_data: {
          name: `Product ${item.name}`, // Replace with your product name
        },
        unit_amount: item.price * 100, // Replace with your product price in cents (e.g., $20 = 2000 cents)
      },
      quantity: item.quantity,
    }));

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Accept card payments
      mode: "payment", // Payment mode: 'payment' for one-time payments
      line_items,
      success_url: "http://localhost:5173/success", // Redirect on successful payment
      cancel_url: "http://localhost:5173/cancel", // Redirect if payment is canceled
    });

    // Respond with the session URL
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe Checkout Session:", error);
    next(new appError("Error creating Stripe Checkout Session", 500));
  }
}
