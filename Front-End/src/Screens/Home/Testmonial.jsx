import testmonialImg from "/images/home/testimonials/testimonials.png";
import avatar1 from "/images/home/testimonials/testimonial1.png";
import avatar2 from "/images/home/testimonials/testimonial2.png";
import avatar3 from "/images/home/testimonials/testimonial3.png";
import { FaStar } from "react-icons/fa";
function Testmonial() {
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Image Half */}
        <div className="md:w-1/2">
          <img src={testmonialImg} alt="testmonialImg" />
        </div>
        {/* Text Half */}
        <div className="md:w-1/2">
          <div className="text-left">
            <p className="subtitle">TESTIMONIAL</p>
            <h2 className="title">Customer Comments</h2>
            <blockquote className="py-5 text-secondary leading-[30px]">
              "I had the pleasure of dinning at Foodi last night, and I'm still
              raving about about the experience.The attention to details was
              impeccable."
            </blockquote>
          </div>
          {/* Avatar inside the second half */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="avatar">
                <div className="w-12">
                  <img src={avatar1} alt="avatar-img" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src={avatar2} alt="avatar-img" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src={avatar3} alt="avatar-img" />
                </div>
              </div>
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-12">
                  <span>+99</span>
                </div>
              </div>
            </div>
            {/* Reviews Section */}
            <div className="space-y-1">
              <h5 className="text-lg font-semibold ">Customer FeedBack</h5>
              <div className="flex flex-row gap-2 items-center">
                <FaStar className="text-yellow-400" />
                <span className="font-medium">
                  4.9<span className="text-[#807E7E]">(18.6k Reviews)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testmonial;
