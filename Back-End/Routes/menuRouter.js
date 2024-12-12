import express from "express";
import {
  getMenuItems,
  getPopularItems,
  getItemsByCategory,
} from "../Controllers/menuControllers.js";

const router = express.Router();

router.get("/", getMenuItems);
router
  .get("/allItems", getMenuItems)
  .get("/popularItems", getPopularItems)
  .get("/:category", getItemsByCategory);

export default router;
