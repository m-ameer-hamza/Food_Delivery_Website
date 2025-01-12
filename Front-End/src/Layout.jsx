import { useLocation } from "react-router-dom";
import "./components/NavBar";
import "./components/Footer";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function Layout({ children }) {
  const location = useLocation();
  // Define the routes where the header and footer should not be displayed
  const noHeaderFooterRoutes = ["/verifyEmail"];

  // Check if the current route matches any of the routes in the array
  const shouldHideHeaderFooter = noHeaderFooterRoutes.includes(
    location.pathname
  );

  return (
    <div>
      {!shouldHideHeaderFooter && <NavBar />}

      <main>{children}</main>
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
}

export default Layout;
