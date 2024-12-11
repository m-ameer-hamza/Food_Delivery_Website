import express from "express";
import {
  getMenuItems,
  getPopularItems,
} from "../Controllers/menuControllers.js";

const router = express.Router();

router.get("/allItems", getMenuItems).get("/popularItems", getPopularItems);

export default router;
