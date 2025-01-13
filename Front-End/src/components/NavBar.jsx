import { useState, useEffect } from "react";
import Menu from "./Menu";
import { FaRegUser } from "react-icons/fa";
import logo from "/logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calcTotalPrice } from "../../Redux/cartSlice";

import Profile from "./Profile";

function NavBar() {
  const [isSticky, setSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(calcTotalPrice());
  }, [cart.cartArray, dispatch]);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  // Toggle dropdown visibility
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Navigate to cart and close dropdown
  const toggleCartMenu = () => {
    setIsDropdownOpen(false); // Close the dropdown
    navigate("/cart"); // Navigate to the cart page
  };

  window.addEventListener("scroll", handleScroll);
  return (
    <header className="container max-w-screen-2xl mx-auto fixed left-0 right-0 top-0 transition-all duration-300 ease-in-out">
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out"
            : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {/* NavBar Items from Menu Component */}
              <Menu />
            </ul>
          </div>
          <Link to="/">
            <img src={logo} />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {/* NavBar Items from Menu Component */}
            <Menu />
          </ul>
        </div>

        <div className="navbar-end">
          {/* Cart */}
          <div className="dropdown dropdown-end mr-3 hidden md:flex">
            {/* Cart Icon */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
              onClick={handleToggleDropdown} // Toggle dropdown on icon click
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span
                  className={`badge badge-sm indicator-item ${
                    cart.totalItems > 0 ? "bg-green text-white" : ""
                  }`}
                >
                  {cart.totalItems}
                </span>
              </div>
            </div>

            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-12 w-52 shadow"
              >
                <div className="card-body">
                  {cart.totalItems > 0 ? (
                    <span className="text-lg font-bold">
                      {cart.totalItems} Items
                    </span>
                  ) : (
                    <span className="text-lg font-bold">Cart is Empty</span>
                  )}
                  <span className="text-info">Subtotal: Rs.{cart.total}</span>
                  <div className="card-actions">
                    <button
                      onClick={toggleCartMenu} // Navigate and close dropdown
                      className="btn bg-green text-white btn-block"
                    >
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Login Button */}
          {isAuthenticated ? (
            <Profile user={userData} />
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="btn bg-green rounded-full px-8 text-white items-center gap-2"
              >
                <FaRegUser size={17} />
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
