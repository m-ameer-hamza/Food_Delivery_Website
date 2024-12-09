import categoryData from "../../Const/CategoryData";

function Category() {
  return (
    //section-container, subtitle and title are classes from the Gobal css file

    //category text
    <div className="section-container py-16">
      <div className="text-center">
        <p className="subtitle">Customer Favioutes</p>
        <h2 className="title">Popular Categories</h2>
      </div>

      {/* category cards */}
      <div className=" flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12">
        {categoryData.map((category, index) => {
          return (
            <div
              key={index}
              className="shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:translate-y-4  duration-300 transition-all"
            >
              <div className="flex w-full mx-auto items-center justify-center">
                <img
                  src={category.image}
                  alt={category.title}
                  className="bg-[#C1F1C6] p-5 rounded-full w-28 h-28"
                />
              </div>
              <div className="mt-5 space-y-1">
                <h5>{category.title}</h5>
                <h3>{category.description}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
