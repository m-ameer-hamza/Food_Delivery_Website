import express from "express";
import { stripePayment } from "../Controllers/paymentController.js";

const router = express.Router();

router.post("/", stripePayment);

export default router;
