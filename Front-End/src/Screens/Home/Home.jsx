import Banner from "./Banner";
import Category from "./Category";
import Crousal from "../../components/Crousal";
import NavBar from "../../components/NavBar";
import Testmonial from "./Testmonial";
import Services from "./Services";
import Footer from "../../components/Footer";
import "../../Global.css";
function HomePage() {
  return (
    <div className="container mx-auto">
      <NavBar />
      <Banner />
      <Category />
      <Crousal />
      <Testmonial />
      <Services />
      <Footer />
    </div>
  );
}

export default HomePage;
