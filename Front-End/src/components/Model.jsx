import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

function Model() {
  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action mt-0 flex flex-col">
          <form className="card-body" method="dialog">
            {/* Show error text here */}
            <h3 className="card-title">Login</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label mt-2">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                title="Login"
                type="submit"
                value="Login"
                className="btn bg-green text-white"
              />
            </div>
            <p className="text-center my-3">
              Do not have an account?
              <Link className="underline text-red ml-4"> Signup Now</Link>
            </p>
          </form>
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
