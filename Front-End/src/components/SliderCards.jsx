import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function SliderCards({ id, item }) {
  const [isFilled, setIsFilled] = useState(false);

  return (
    <div
      key={id}
      className="card bg-base-100 w-[350px] shadow-xl hover:scale-105 transition-all duration-300 ease-in-out hover:cursor-pointer"
    >
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isFilled ? "text-rose-500" : "text-white"
        }`}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      {/* <Link to={`/menu/${item._id}`}> */}
      <figure>
        <img
          className="hover:scale-105 transition-all duration-200 md:h-72"
          src={item.image}
          alt="Item Image"
        />
      </figure>
      {/* </Link> */}
      <div className="card-body">
        {/* <Link to={`/menu/${item._id}`}> */}
        <h2 className="card-title relative group">
          {item.name}
          <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-black group-hover:w-1/2 transition-all duration-500"></span>
        </h2>
        {/* </Link> */}

        <p>{item.recipe}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">Rs. </span>
            {item.price}
          </h5>
          <button className="btn bg-green text-white">Add Cart</button>
        </div>
      </div>
    </div>
  );
}

export default SliderCards;
