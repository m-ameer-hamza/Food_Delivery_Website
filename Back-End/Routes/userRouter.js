import express from "express";
import { googleSignIn } from "../Controllers/userControllers.js";

const router = express.Router();

router.post("/googleSignIn", googleSignIn);

export default router;
