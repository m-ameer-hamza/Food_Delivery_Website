import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm.jsx";
import { STRIPE_PUBLISHABLE_KEY } from "../../../Global.js";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const CheckOut = () => {
  const location = useLocation();
  const { clientSecret } = location.state || {};

  if (!clientSecret) {
    return <p>Error: Missing client secret.</p>;
  }

  return (
    // <div className="min-h-screen">
    //   <div className="section-container">
    //     <Elements stripe={stripePromise} options={{ clientSecret }}>
    //       {/* <PaymentForm clientSecret={clientSecret} /> */}

    //     </Elements>
    //   </div>
    // </div>

    <div className="min-h-screen">
      <div className="section-container">
        {/* Banner */}
        <div className="px-2 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
          <div className="py-24 flex flex-col justify-center items-center gap-8">
            {/* Text section */}
            <div className="spcae-y-7 px-4">
              <h2 className="md:text-4xl text-3xl font-bold md:leading-snug leading-snug">
                Add your card details to
                <span className="text-green"> Pay</span>
              </h2>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h2></h2>
          </div>
          <div>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm clientSecret={clientSecret} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
