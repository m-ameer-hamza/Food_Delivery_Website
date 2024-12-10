import "./Global.css";
import Banner from "./components/Banner";
import Category from "./components/Category";
import Crousal from "./components/Crousal";
import NavBar from "./components/NavBar";
import Testmonial from "./components/Testmonial";
import Services from "./components/Services";
import Footer from "./components/Footer";
import MenuPage from "../Screens/MenuPage";
const App = () => {
  return (
    <div className="container mx-auto">
      {/* <NavBar />
      <Banner />
      <Category />
      <Crousal />
      <Testmonial />
      <Services />
      <Footer /> */}

      <MenuPage />
    </div>
  );
};

export default App;
