import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
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
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
