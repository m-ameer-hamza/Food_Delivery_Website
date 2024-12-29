import express from "express";
import {
  googleSignIn,
  createUser,
  loginUser,
} from "../Controllers/userControllers.js";

const router = express.Router();

router
  .post("/googleSignIn", googleSignIn)
  .post("/signUpUser", createUser)
  .get("/loginUser", loginUser);

export default router;
