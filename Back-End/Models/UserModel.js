import mongoose from "mongoose";
import bcrypt from "bcrypt";
import appError from "../error.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  signUpMethod: {
    type: String,
    enum: ["email", "google"],
    default: "email",
  },
  verified: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },
  otpCode: {
    type: Number,
  },
  img: {
    type: String,
    default: "/user-images/user-avatar.png",
  },
  otpCodeExpires: {
    type: Date,
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (err) {
    console.log(err.message);
    appError("Error in hashing password", 500);
  }
});

//instant method for comparing password
userSchema.methods.mathPassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

//method for creating otp of 5 digits
userSchema.methods.createOtp = async function () {
  const otp = Math.floor(100000 + Math.random() * 900000);
  this.otpCode = otp;
  this.otpCodeExpires = Date.now() + 10 * 60 * 1000;
  return otp;
};

//creating user model
const User = mongoose.model("User", userSchema);

export default User;
