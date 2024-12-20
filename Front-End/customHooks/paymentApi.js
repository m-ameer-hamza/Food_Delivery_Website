import axios from "axios";
import { BACK_END_URL } from "../Global";

export function usePaymentApi() {
  const handlePayment = async (cart) => {
    const response = await axios.post(`${BACK_END_URL}/payment`, {
      items: cart,
    });
    console.log("Payment response", response.data);
    return response.data;
  };

  return {
    handlePayment,
  };
}
