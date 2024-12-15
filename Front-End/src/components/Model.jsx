import { useRef } from "react";
import LoginForm from "./LoginForm.jsx";
import GoogleLogin from "./GoogleLogin.jsx";

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
          <div className="flex items-center justify-center space-x-10 mb-2">
            <GoogleLogin />
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default Model;
