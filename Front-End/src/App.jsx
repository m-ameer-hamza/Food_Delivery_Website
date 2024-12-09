import "./Global.css";
import Banner from "./components/Banner";
import Category from "./components/Category";
import Crousal from "./components/Crousal";
import NavBar from "./components/NavBar";
import Testmonial from "./components/Testmonial";
const App = () => {
  return (
    <div className="container mx-auto">
      <NavBar />
      <Banner />
      <Category />
      <Crousal />
      <Testmonial />
    </div>
  );
};

export default App;
