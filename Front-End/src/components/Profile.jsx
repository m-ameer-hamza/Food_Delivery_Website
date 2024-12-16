import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { FaUserPen } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../Redux/userSlice.js";
import { logout } from "../../Redux/authSlice.js";
import { useNavigate } from "react-router-dom";
function Profile({ user }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const closeDropDown = () => {
    navigate("/userProfile");
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-4 justify-center ml-3">
      <h2 className="text-lg font-bold">{user.name}</h2>
      <div className="dropdown  dropdown-bottom mt-2 dropdown-end transition-all ease-in-out duration-300">
        <div
          tabIndex={0}
          className="avatar cursor-pointer"
          onClick={handleToggle}
        >
          <div className="w-10 rounded-full overflow-hidden">
            <img src={user.img} alt="User Avatar" />
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
              <div className="flex items-center gap-5 justify-around">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent interference
                    console.log("Logout");
                    dispatch(logout());
                    dispatch(clearUser());
                  }}
                >
                  <span className="text-lg">Logout</span>
                </button>
                <IoIosLogOut size={25} />
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Profile;
