import Logo from "/logo.png";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      {/* Links and Logo section */}
      <div className="footer xl:px-24 py-10 px-4 text-base-content gap-28">
        <aside>
          <img src={Logo} alt="logo" />
          <p className="py-5 md:w-40">
            Savour the artistry where every dish is a culinary mastery
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Useful Links</h6>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Events</a>
          <a className="link link-hover">FAQ</a>
        </nav>
        <nav>
          <h6 className="footer-title">Main Menu</h6>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Offers</a>
          <a className="link link-hover">Reservations</a>
        </nav>
        <nav>
          <h6 className="footer-title">Contact Us</h6>
          <a className="link link-hover">ameerhamza01aug@gmail.com</a>
          <a className="link link-hover">+92 3074110646</a>
          <a className="link link-hover">Social Media</a>
        </nav>
      </div>

      <hr />
      {/* Copyright Section */}
      <div className="footer items-center xl:px-24 py-10 px-4 -mt-10">
        <aside className="grid-flow-col items-center">
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a
            href="https://wa.me/923074110646"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsappSquare size={35} />
          </a>
          <a
            href="https://www.linkedin.com/in/m-ameer-hamza-siddiq/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={35} />
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
