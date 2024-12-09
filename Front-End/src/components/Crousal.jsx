import { useState, useEffect } from "react";
import SliderCards from "./SliderCards.jsx";
import MenuData from "../../Const/menuData.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Crousal() {
  const [popularMenu, setPopularMenu] = useState([]);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    // Filter the popular menu from the menu data
    //Convert it to api call so that it can be fetched from the backend
    const popularMenuData = MenuData.filter(
      (menu) => menu.category === "popular"
    );

    setPopularMenu(popularMenuData);
  }, []);

  return (
    <div className="section-container my-20">
      {/* Crousal heading text text */}
      <div>
        <div className="text-left">
          <p className="subtitle">Customer Favioutes</p>
          <h2 className="title md:w-[520px]">Popular Categories</h2>
        </div>
      </div>
      {/* Crousal Cards */}
      <div className="slider-container ">
        <Slider {...settings}>
          {popularMenu.map((item) => {
            return <SliderCards key={item._id} item={item} />;
          })}
        </Slider>
      </div>
    </div>
  );
}

export default Crousal;
