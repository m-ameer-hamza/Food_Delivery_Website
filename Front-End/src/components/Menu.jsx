import { Link } from "react-router-dom";
function Menu() {
  return (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <details>
          <summary>Menu</summary>
          <ul className="p-2 w-52 ">
            <li className="hover:bg-green hover:text-white transition-all duration-200 hover:rounded-md">
              <Link to="/menu">All Menu</Link>
            </li>
            <li className="hover:bg-green hover:text-white transition-all duration-200 hover:rounded-md">
              <Link to="/">Fast Food</Link>
            </li>
            <li className="hover:bg-green hover:text-white transition-all duration-200 hover:rounded-md">
              <Link to="/">Deserts</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
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
