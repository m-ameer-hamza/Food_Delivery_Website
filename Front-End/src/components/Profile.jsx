import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { FaUserPen } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BACK_END_URL } from "../../Global.js";
function Profile({ user }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const closeDropDown = () => {
    navigate("/userProfile");
    setIsOpen(false);
  };

  const handleLogout = () => {
    setIsLoading(true); // Show loading state
    try {
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  const isAbsoluteUrl = (url) => url.startsWith("http");

  return !isLoading ? (
    <div className="flex items-center gap-4 justify-center ml-3">
      <h2 className="text-lg font-bold">{user.name}</h2>
      <div className="dropdown dropdown-bottom mt-2 dropdown-end transition-all ease-in-out duration-300">
        <div
          tabIndex={0}
          className="avatar cursor-pointer"
          onClick={handleToggle}
        >
          <div className="w-10 rounded-full overflow-hidden">
            {isAbsoluteUrl(user.img) ? (
              <img src={user.img} alt="User Avatar" />
            ) : (
              <img src={`${BACK_END_URL}${user.img}`} alt="User Avatar" />
            )}
          </div>
        </div>
        {isOpen && (
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow py-4"
          >
            <li>
              <div className="flex items-center gap-5 justify-around">
                <Link to="/">
                  <span className="text-lg">Orders</span>
                </Link>
                <LuClipboardList size={25} />
              </div>
            </li>
            <li onClick={closeDropDown}>
              <div className="flex items-center gap-5 justify-around">
                <span className="text-lg">Profile</span>
                <FaUserPen size={25} />
              </div>
            </li>
            <li>
              <button
                className="flex items-center gap-5 justify-around"
                onClick={() => {
                  handleLogout();
                }}
              >
                <span className="text-lg">Logout</span>
                <IoIosLogOut size={25} />
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  ) : (
    <span className="loading loading-spinner loading-lg bg-green"></span>
  );
}

export default Profile;
