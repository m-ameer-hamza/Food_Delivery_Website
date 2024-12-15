import { useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import LoginForm from "./LoginForm.jsx";

function Model() {
  const modalRef = useRef(null); // Create a ref for the modal

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.close(); // Close the modal using the ref
    }
  };
  return (
    <dialog
      ref={modalRef}
      id="my_modal_5"
      className="modal modal-middle sm:modal-middle"
    >
      {/* Backdrop for closing modal when clicking outside */}
      <div className="modal-backdrop" onClick={handleClose}></div>

      {/* Modal Content */}
      <div className="modal-box">
        <div className="modal-action mt-0 flex flex-col">
          {/* LoginForm Component */}
          <LoginForm handleModel={handleClose} />

          {/* Social Login Buttons */}
          <div className="text-center space-x-10 mb-5">
            <button className="btn btn-circle">
              <FcGoogle size={40} />
            </button>
            <button className="btn btn-circle">
              <FaFacebook color="blue" size={40} />
            </button>
            <button className="btn btn-circle">
              <IoLogoWhatsapp color="green" size={40} />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default Model;
