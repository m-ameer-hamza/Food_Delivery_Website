import express from "express";
import {
  getMenuItems,
  getPopularItems,
  getItemsByCategory,
  getCategoryCount,
  getMenuItemsCount,
} from "../Controllers/menuControllers.js";

const router = express.Router();

router
  .get("/itemsCount", getMenuItemsCount)
  .get("/allItems", getMenuItems)
  .get("/popularItems", getPopularItems)
  .get("/categoryCount", getCategoryCount)
  .get("/:category", getItemsByCategory);

export default router;
