import Banner from "./Banner";
import Category from "./Category";
import Crousal from "../../components/Crousal";
import Testmonial from "./Testmonial";
import Services from "./Services";

import "../../Global.css";
function HomePage() {
  return (
    <div className="container mx-auto">
      <Banner />
      <Category />
      <Crousal />
      <Testmonial />
      <Services />
    </div>
  );
}

export default HomePage;
