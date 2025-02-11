import axios from "axios";
import { BACK_END_URL } from "../Global";

export function useUserApi() {
  const googleSignIn = async (token) => {
    const response = await axios.post(`${BACK_END_URL}/user/googleSignIn`, {
      token,
    });
    return response.data;
  };
  const emailSignUp = async (email, password, username) => {
    const response = await axios.post(`${BACK_END_URL}/user/signUpUser`, {
      email,
      password,
      username,
    });
    return response;
  };
  const emailLogin = async (email, password) => {
    const response = await axios.get(`${BACK_END_URL}/user/loginUser`, {
      params: {
        email,
        password,
      },
    });
    return response;
  };

  return {
    googleSignIn,
    emailSignUp,
    emailLogin,
  };
}
