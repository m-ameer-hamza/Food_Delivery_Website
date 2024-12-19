import { useSelector } from "react-redux";
import CartTable from "./CartTable";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Cart() {
  const cartItms = useSelector((state) => state.cart.totalItems);

  useEffect(() => {
    console.log("Cart Items: ", cartItms);
  }, [cartItms]);

  return (
    <div className="min-h-screen">
      <div className="section-container">
        {/* Banner */}
        <div className="px-2 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
          <div className="py-32 flex flex-col justify-center items-center gap-8">
            {/* Text section */}
            <div className="spcae-y-7 px-4">
              <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                Items present in your
                <span className="text-green"> Cart</span>
              </h2>
            </div>
          </div>
        </div>
        {/* Items Table*/}
        {cartItms > 0 ? (
          <CartTable />
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-center">
              Your cart is empty. Add items in your cart.
            </h2>
            <div className="flex justify-center mt-5">
              <Link to="/menu">
                <button className="btn bg-green text-white text-lg mt-4">
                  Go to Menu
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
