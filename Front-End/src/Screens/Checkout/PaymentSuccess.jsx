import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useOrderApi } from "../../../customHooks/useOrderApi";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { cartClear } from "../../../Redux/cartSlice";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { saveOrder } = useOrderApi();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const { data, isLoading, isError } = useQuery(
    "save_order", // Static query key
    () => saveOrder(cart.cartArray, cart.total + 100, user.email), // Query function
    {
      enabled: !!cart && !!user, // Ensure query runs only when dependencies are available
    }
  );

  useEffect(() => {
    //clear the cart after successful payment
    if (data) {
      dispatch(cartClear());
    }
  }, [data]);

  useEffect(() => {
    //if there is an error, navigate to the cancel page
    if (isError) {
      navigate("/cancel");
    }
  }, [isError]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        {isLoading ? (
          <>
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
            <h2 className="text-2xl font-bold mt-4 text-gray-800">
              Updating the order....
            </h2>
            <p className="text-gray-600 mt-2">
              Please hold on. We are updating the the cart.
            </p>
          </>
        ) : (
          <>
            {/* Animated Icon */}
            <div className="flex justify-center">
              <FaCheckCircle
                className="text-green-500 text-6xl animate-bounce "
                aria-hidden="true"
              />
            </div>

            {/* Success Message */}
            <h2 className="text-2xl font-bold mt-4 text-gray-800">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mt-2">
              Thank you for your payment. Your transaction has been completed.
            </p>

            {/* Button */}
            <button
              className="mt-6 btn bg-green px-10 py-2 text-white rounded-md shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={() => navigate("/")}
              disabled={isLoading}
            >
              Okay
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
