import appError from "../error.js";
import User from "../Models/UserModel.js";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

//setting up the config file
dotenv.config({ path: "../config.env" });
const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE_SIGN_IN);

//verify token from google
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID_GOOGLE_SIGN_IN,
  });
  const payload = ticket.getPayload();

  return payload;
}

export const googleSignIn = async (req, res) => {
  //check if request contains token
  if (!req.body.token) {
    appError("Token not found", 400);
  } else {
    try {
      //verify the token. This function verify will return the payload
      const payload = await verify(req.body.token);
      console.log("Payload from googleSign-in ", payload);

      //check if user already exists
      const user = await User.findOne({
        email: payload.email,
      });
      if (user) {
        res.status(200).json({
          status: "success",
          data: {
            name: user.username,
            email: user.email,
            img: user.img,
          },
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
          data: {
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
