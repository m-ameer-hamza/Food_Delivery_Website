import express from "express";
import { googleSignIn, createUser } from "../Controllers/userControllers.js";

const router = express.Router();

router.post("/googleSignIn", googleSignIn).post("/signUpUser", createUser);

export default router;
