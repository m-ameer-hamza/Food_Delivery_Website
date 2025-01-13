import axios from "axios";
import { BACK_END_URL } from "../Global";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export function useAuthApi() {
  //This function is used to sign in the user using google
  const googleSignIn = async (token) => {
    const response = await axios.post(`${BACK_END_URL}/user/googleSignIn`, {
      token,
    });
    return response.data;
  };

  //This function is used to sign in the user using email and password
  const emailLogin = async (email, password) => {
    const response = await axios.get(`${BACK_END_URL}/user/loginUser`, {
      params: {
        email,
        password,
      },
    });
    return response;
  };

  //This function is used to create a new user in the database
  const createUser = async (data) => {
    try {
      const response = await axios.post(
        `${BACK_END_URL}/user/signupEmail`,
        data
      );

      if (response.status === 201) {
        var res = await signUpUser(data.email, data.password);
        //saving the userId in the local storage to use it in verifyEmail function
        localStorage.setItem("userId", response.data.userId);
        return res;
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Throw a specific error for 409 status code
        throw new Error("User already exists");
      } else {
        throw new Error(error.message);
      }
    }
  };

  //This function is used to sign up the user in the firebase.
  //It will be called after the user is created in the database
  const signUpUser = async (email, password) => {
    const auth = getAuth();
    //storing email in the local storage to use it in verifyEmail function
    localStorage.setItem("emailForVerification,", email);
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
      return await sendVerificationEmail(user);
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      throw new Error("Error in sign up user to fire base");
    }
  };

  //This function is used to send the verification email to the user.
  //It will be called by signUpUser function (above function) after the user is created in the firebase
  const sendVerificationEmail = async (user) => {
    const actionCodeSettings = {
      url: "http://localhost:5173/verifyEmail", // Replace with your redirect URL
      handleCodeInApp: true, // Ensures Firebase handles the verification process
    };

    try {
      await sendEmailVerification(user, actionCodeSettings);
      return true;
    } catch (error) {
      console.error("Error sending email verification:", error.message);
      throw new Error("Error sending email verification");
    }
  };

  //This function is used to verify the email of the user.
  //It will be called after the redirect from the email verification link
  //Used to change the verification status of the user in the database
  const verifyEmail = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.patch(`${BACK_END_URL}/user/verifyEmail`, {
        userId,
      });
      return response.data;
    } catch (error) {
      console.error("Error in verifying email:", error.message);
      throw new Error("Error in verifying email");
    }
  };

  return {
    googleSignIn,
    emailLogin,
    signUpUser,
    createUser,
    verifyEmail,
  };
}
