import ServiceList from "../../../Const/ServicesData";
function Services() {
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Text Section */}
        <div className="w-1/2">
          <div className="md:w-1/2">
            <div className="text-left">
              <p className="subtitle">OUR SERVICES</p>
              <h2 className="title">Our Services</h2>
              <p className="py-5 text-secondary leading-[30px]">
                Rooted in Passion, we created unforgettable dining experience
                and offer exceptional services, blending culinary artistry with
                warm hospitality.
              </p>
              <button className="btn bg-green text-white px-8 py-3 rounded-full">
                Explore
              </button>
            </div>
          </div>
        </div>
        {/* Image Sections */}
        <div className="w-1/2">
          <div className=" grid sm:grid-cols-2 grid-cols-1 items-center gap-8 md:gap-14">
            {ServiceList.map((service) => {
              return (
                <div
                  key={service.id}
                  className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border-indigo-600 transition-all duration-200 hover:border"
                >
                  <img
                    className="mx-auto"
                    src={service.image}
                    alt="service-img"
                  />
                  <h5 className="pt-3 font-semibold ">{service.title}</h5>
                  <p className="text-[#90BD95]">{service.des}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Services;
