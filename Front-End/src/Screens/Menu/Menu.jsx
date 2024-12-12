import { useState } from "react";

import AllMenu from "./AllMenu";
import CatMenu from "./CatMenu";
import { FaFilter } from "react-icons/fa";
function Menu() {
  const [fechAll, setFechAll] = useState(true);
  const [fetchCat, setFetchCat] = useState(false);
  const [category, setCategory] = useState("");

  const sortOptions = [];
  const sortHandler = (e) => {};

  return (
    <div>
      {/* Menu Banner */}
      <div className="max-w-screen-2xl container mx-auto lg:px-24 px-2 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col justify-center items-center gap-8">
          {/* Text section */}
          <div className="text-center spcae-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious
              <span className="text-green"> Food</span>
            </h2>
            <p className="text-xl text-[#4A4A4A] mt-3 md:w-4/5 mx-auto">
              Come with the falimy and feel the joy of mouthwatering food such
              as Greek Salad, Lasagne, Butternut, Pumpkin, Olivas Rellenas and
              more for a moderate cost
            </p>
            <button className="btn bg-green mt-7 px-8 py-3 font-semibold text-white rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>
      {/* Menu Shop  */}
      <div className="section-container">
        {/* Filtering and Sorting */}

        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* Categories btn */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button
              onClick={() => {
                //setting fetch by category false
                setFetchCat(false);
                setFechAll(true);
              }}
              className={fechAll ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => {
                //set fetchAll false
                setFechAll(false);
                //fetch the salad products
                setCategory("salad");
                setFetchCat(true);
              }}
              className={category === "salad" ? "active" : ""}
            >
              Salad
            </button>
            <button
              onClick={() => {
                //set fetchAll false
                setFechAll(false);
                //fetch the salad products
                setCategory("soup");
                setFetchCat(true);
              }}
              className={category === "soup" ? "active" : ""}
            >
              Soups
            </button>
            <button
              onClick={() => {
                //set fetchAll false
                setFechAll(false);
                //fetch the salad products
                setCategory("dessert");
                setFetchCat(true);
              }}
              className={category === "dessert" ? "active" : ""}
            >
              Desserts
            </button>
            <button
              onClick={() => {
                //set fetchAll false
                setFechAll(false);
                //fetch the salad products
                setCategory("drinks");
                setFetchCat(true);
              }}
              className={category === "drinks" ? "active" : ""}
            >
              Drinks
            </button>
          </div>
          {/* Sorting and filtering */}
          <div className="flex justify-end mb-4 rounded-sm ">
            <div className="bg-black p-2">
              <FaFilter className="h-4 w-4 text-white " />
            </div>
            {/* Sorting options */}
            <select
              name="sort"
              id="sort"
              onChange={(e) => {
                sortHandler(e.target.value);
              }}
              value={sortOptions}
              className=" bg-black text-white px-2 py-1 rounded-sm"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high"> Low to High</option>
              <option value="high-to-low"> High to Low</option>
            </select>
          </div>
        </div>

        {/* Product cards */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-8">
          {fechAll ? <AllMenu /> : <CatMenu catName={category} />}
        </div>
      </div>
    </div>
  );
}

export default Menu;
