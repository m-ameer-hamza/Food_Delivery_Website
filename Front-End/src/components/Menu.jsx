import { useRef } from "react";
import { Link } from "react-router-dom";
function Menu() {
  const menuDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);

  const closeDropdown = () => {
    if (menuDropdownRef.current) {
      menuDropdownRef.current.close();
    }
    if (servicesDropdownRef.current) {
      servicesDropdownRef.current.close();
    }
  };

  return (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <details ref={menuDropdownRef}>
          <summary>Menu</summary>
          <ul className="p-2 w-52 ">
            <li className="hover:bg-green hover:text-white transition-all duration-200 hover:rounded-md">
              <Link to="/menu" onClick={closeDropdown}>
                All Menu
              </Link>
            </li>
            <li className="hover:bg-green hover:text-white transition-all duration-200 hover:rounded-md">
              <Link to="/" onClick={closeDropdown}>
                Fast Food
              </Link>
            </li>
            <li className="hover:bg-green hover:text-white transition-all duration-200 hover:rounded-md">
              <Link to="/" onClick={closeDropdown}>
                Deserts
              </Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details ref={servicesDropdownRef}>
          <summary>Services</summary>
          <ul className="p-2">
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </details>
      </li>

      <li>
        <a>Offers</a>
      </li>
    </>
  );
}

export default Menu;
