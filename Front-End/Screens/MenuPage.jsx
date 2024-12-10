function Menu() {
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
      <div className="section-container"></div>
    </div>
  );
}

export default Menu;
