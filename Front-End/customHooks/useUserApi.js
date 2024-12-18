import axios from "axios";
import { BACK_END_URL } from "../Global";

export function useUserApi() {
  const googleSignIn = async (token) => {
    const response = await axios.post(`${BACK_END_URL}/user/googleSignIn`, {
      token,
    });
    return response.data;
  };

  return {
    googleSignIn,
  };
}
