import axios from "axios";
import { BACK_END_URL } from "../Global";

export function usePaymentApi() {
  const handlePayment = async (amount, curr) => {
    const response = await axios.post(`${BACK_END_URL}/payment`, {
      amount: amount,
      currency: curr,
    });
    console.log(response.data);
    return response.data;
  };

  return {
    handlePayment,
  };
}
