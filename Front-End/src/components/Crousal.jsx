import { useState, useEffect, useRef } from "react";
import SliderCards from "./SliderCards.jsx";
import MenuData from "../../Const/menuData.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useMenuApi } from "../../customHooks/useMenuApi.js";
import { useQuery } from "react-query";
import LoadingCard from "./LoadingCard.jsx";

function Crousal() {
  const sliderRef = useRef(Slider);
  //const [popularMenu, setPopularMenu] = useState([]);

  const { getPopularMenu } = useMenuApi();

  const { isLoading, isError, data } = useQuery("popularItems", getPopularMenu);

  const loadingArray = ["", "", "", "", "", ""];

  //handlers for arrow
  const CustomeNextArrow = (props) => {
    const { className, style, onClick } = props;

    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      >
        NEXT
      </div>
    );
  };

  const CustomePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      >
        PREV
      </div>
    );
  };

  //slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
    nextArrow: <CustomeNextArrow />,
    prevArrow: <CustomePrevArrow />,
  };

  // useEffect(() => {
  //   // Filter the popular menu from the menu data
  //   //Convert it to api call so that it can be fetched from the backend
  //   const popularMenuData = MenuData.filter(
  //     (menu) => menu.category === "popular"
  //   );

  //   setPopularMenu(popularMenuData);
  // }, []);

  // useEffect(() => {

  // }, []);

  return (
    <div className="section-container my-20 relative">
      {/* Crousal heading text text */}
      <div>
        <div className="text-left">
          <p className="subtitle">Customer Favioutes</p>
          <h2 className="title md:w-[520px]">Popular Categories</h2>
        </div>
      </div>
      {/* Crousal Cards */}
      <div className="slider-container sm:justify-center">
        {/* Slider Buttons */}
        <div className="md:absolute right-3 top-8 mb-2 md:mr-24">
          <button
            onClick={() => {
              sliderRef?.current?.slickPrev();
            }}
            className="btn p-2 rounded-full ml-5"
          >
            <FaAngleLeft className="w-8 h-8 p-1" />
          </button>
          <button
            onClick={() => {
              sliderRef?.current?.slickNext();
            }}
            className="btn p-2 rounded-full ml-5 bg-green"
          >
            <FaAngleRight className="w-8 h-8 p-1" />
          </button>
        </div>
        <Slider
          ref={sliderRef}
          {...settings}
          className="overflow-hidden mt-10 space-x-10"
        >
          {isLoading
            ? loadingArray.map((_, idx) => <LoadingCard key={idx} />)
            : data?.map((item) => <SliderCards key={item._id} item={item} />)}
        </Slider>
      </div>
    </div>
  );
}

export default Crousal;
