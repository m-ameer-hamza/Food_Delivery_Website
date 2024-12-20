import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Customer Name", // Replace with dynamic name if needed
          },
        },
      }
    );

    if (error) {
      setPaymentStatus(`Payment failed: ${error.message}`);
    } else if (paymentIntent.status === "succeeded") {
      setPaymentStatus("Payment successful!");
      setTimeout(() => navigate("/success"), 3000); // Redirect to success page after 3 seconds
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Payment Details</h2>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn bg-green mt-4"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};
export default PaymentForm;
