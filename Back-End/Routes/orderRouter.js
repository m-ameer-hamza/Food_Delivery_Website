import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
} from "../Controllers/orderControllers.js";

const router = express.Router();

router
  .post("/", createOrder)
  .get("/", getOrders)
  .put("/:id", updateOrderStatus);

export default router;
