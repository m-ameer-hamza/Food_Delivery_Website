import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const PaymentFailure = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        {/* Animated Icon */}
        <div className="flex justify-center">
          <FaTimesCircle
            className="text-red-500 text-6xl animate-shake"
            aria-hidden="true"
          />
        </div>

        {/* Failure Message */}
        <h2 className="text-2xl font-bold mt-4 text-gray-800">
          Payment Failed!
        </h2>
        <p className="text-gray-600 mt-2">
          Unfortunately, your payment could not be processed. Please try again.
        </p>

        {/* Button */}
        <button
          className="mt-6 btn btn-secondary px-6 py-2 text-white rounded-md shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
          onClick={() => navigate("/cart")}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;
