import axios from "axios";
import { BACK_END_URL } from "../Global";

export function useMenuApi() {
  const getPopularMenu = async () => {
    const response = await axios.get(`${BACK_END_URL}/menu/popularItems`);
    return response.data;
  };

  const getMenu = async (page = 1, limit = 9) => {
    const response = await axios.get(`${BACK_END_URL}/menu/allItems`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  };
  const getMenuByCategory = async (category) => {
    const response = await axios.get(`${BACK_END_URL}/menu/${category}`);

    console.log(response.data);
    return response.data;
  };

  return { getPopularMenu, getMenu, getMenuByCategory };
}
