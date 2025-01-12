import express from "express";
import {
  googleSignIn,
  createUser,
  loginUser,
  verifyEmail,
} from "../Controllers/userControllers.js";

const router = express.Router();

router
  .post("/googleSignIn", googleSignIn)
  .post("/signupEmail", createUser)
  .patch("/verifyEmail", verifyEmail)
  .get("/loginUser", loginUser);

export default router;
