import axios from "axios";
import { BACK_END_URL } from "../Global";

export function useMenuApi() {
  const getPopularMenu = async () => {
    const response = await axios.get(`${BACK_END_URL}/menu/popularItems`);
    return response.data;
  };

  const getMenu = async (page) => {
    const response = await axios.get(`${BACK_END_URL}/menu/allItems`, {
      params: {
        page,
      },
      timeout: 5000,
    });
    return response.data;
  };
  const getMenuByCategory = async (category, page) => {
    const response = await axios.get(`${BACK_END_URL}/menu/${category}`, {
      params: {
        page,
      },
    });

    console.log(response.data);
    return response.data;
  };
  const getMenuItemsPageCount = async () => {
    const response = await axios.get(`${BACK_END_URL}/menu/itemsCount`);
    return response.data;
  };
  const getMenuItemsByCategoryPageCount = async (category) => {
    const response = await axios.get(`${BACK_END_URL}/menu/categoryCount`, {
      params: {
        category: category,
      },
    });

    return response.data;
  };

  return {
    getPopularMenu,
    getMenu,
    getMenuByCategory,
    getMenuItemsPageCount,
    getMenuItemsByCategoryPageCount,
  };
}
