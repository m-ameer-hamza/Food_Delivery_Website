import axios from "axios";
import { BACK_END_URL } from "../Global";

export function useOrderApi() {
  const saveOrder = async (order, amount, email) => {
    const response = await axios.post(
      `${BACK_END_URL}/order`, // The endpoint
      {
        orderItems: order,
        totalBillAmount: amount, // Request body
      },
      {
        params: {
          email, // Query parameter
        },
      }
    );

    return response.data;
  };
  return {
    saveOrder,
  };
}
