import "./Global.css";
import Banner from "./components/Banner";
import Category from "./components/Category";
import Crousal from "./components/Crousal";
import NavBar from "./components/NavBar";
const App = () => {
  return (
    <div className="container mx-auto">
      <NavBar />
      <Banner />
      <Category />
      <Crousal />
    </div>
  );
};

export default App;
