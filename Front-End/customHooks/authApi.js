import axios from "axios";
import { BACK_END_URL } from "../Global";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export function useUserApi() {
  const googleSignIn = async (token) => {
    const response = await axios.post(`${BACK_END_URL}/user/googleSignIn`, {
      token,
    });
    return response.data;
  };

  const signUpUser = async (email, password) => {
    const auth = getAuth();

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the user object from the userCredential
      const user = userCredential.user;

      // Send email verification
      await sendVerificationEmail(user);
    } catch (error) {
      console.error("Error during sign-up:", error.message);
    }
  };

  const sendVerificationEmail = async (user) => {
    const actionCodeSettings = {
      url: "http://localhost:5173/signup", // Replace with your redirect URL
      handleCodeInApp: true, // Ensures Firebase handles the verification process
    };

    try {
      await sendEmailVerification(user, actionCodeSettings);
      console.log("User is: ", user);
      return true;
    } catch (error) {
      console.error("Error sending email verification:", error.message);
      return false;
    }
  };

  const saveUserSignUpData = async (data, token) => {
    const response = await axios.post(`${BACK_END_URL}/user/signupEmail`, {
      data,
      token,
    });
    return response.data;
  };

  return {
    googleSignIn,
    signUpUser,
    saveUserSignUpData,
  };
}
