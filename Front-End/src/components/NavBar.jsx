import { useState, useEffect } from "react";
import Menu from "./Menu";
import { FaRegUser } from "react-icons/fa";
import logo from "/logo.png";
import { Link } from "react-router-dom";
import Model from "./Model";
import { useSelector } from "react-redux";
import store from "../../Redux/store";
import Profile from "./Profile";

function NavBar() {
  const [isSticky, setSticky] = useState(false);
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  const userData = useSelector((store) => store.user);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
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
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
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
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn bg-green text-white btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Login Button */}
          {isAuthenticated ? (
            <Profile user={userData} />
          ) : (
            <>
              <button
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
                className="btn bg-green rounded-full px-8 text-white items-center gap-2"
              >
                <FaRegUser size={17} />
                Login
              </button>
              {/* Login Model */}
              <Model />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
