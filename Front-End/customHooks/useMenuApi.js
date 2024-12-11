import axios from "axios";
import { BACK_END_URL } from "../Global";

export function useMenuApi() {
  const getPopularMenu = async () => {
    const response = await axios.get(`${BACK_END_URL}/menu/popularItems`);
    return response.data;
  };

  return { getPopularMenu };
}
