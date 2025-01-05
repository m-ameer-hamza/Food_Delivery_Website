import appError from "../error.js";
import User from "../Models/UserModel.js";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcrypt";

dotenv.config({ path: "../config.env" });
const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE_SIGN_IN);
// Verify token from Google
async function verify(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Replace with your Web Client ID if needed
    });

    const payload = ticket.getPayload();
    return payload;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Token verification failed");
  }
}

export const googleSignIn = async (req, res) => {
  //check if request contains token
  if (!req.body.token) {
    appError("Token not found", 400);
  } else {
    try {
      //verify the token. This function verify will return the payload
      const payload = await verify(req.body.token);

      //check if user already exists
      const user = await User.findOne({
        email: payload.email,
      });
      if (user && user.signUpMethod === "google") {
        //if user exists and sign up method is google
        return res.status(200).json({
          status: "success",
          user: {
            name: user.username,
            email: user.email,
            img: user.img,
          },
        });
      } else if (user && user.signUpMethod !== "google") {
        //if user exists but sign up method is not google
        return res.status(409).json({
          message: "Wrong sign in method",
        });
      } else {
        //if user does not exists create a new user
        const newUser = await User.create({
          username: payload.name,
          email: payload.email,
          signUpMethod: "google",
          verified: true,
          img: payload.picture,
        });
        res.status(201).json({
          status: "success",
          user: {
            name: newUser.username,
            email: newUser.email,
            img: newUser.img,
          },
        });
      }
    } catch (err) {
      console.log(err.message);
      appError("Error in google sign in", 500);
    }
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    //check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
    //create a new user
    const newUser = await User.create({
      username,
      email,
      password,
    });
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
export const loginUser = async (req, res, next) => {
  try {
    //get email and password from query
    const { email, password } = req.query;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    //check if user sign up is email
    if (user.signUpMethod !== "email") {
      return res.status(409).json({
        message: "User signed up with google",
      });
    }

    //check if password is correct
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        name: user.username,
        email: user.email,
        img: user.img,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
