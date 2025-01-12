import { useState, useEffect } from "react";
import {
  FaUserAlt,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUserApi } from "../../../customHooks/authApi";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(true);
  const [passError, setPassError] = useState(true);
  const [nameError, setNameError] = useState(true);
  const [userData, setUserData] = useState();
  const [runQuery, setRunQuery] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = useUserApi();

  //email verification using google firebase query
  const { isLoading } = useQuery("signUpUser", () => createUser(userData), {
    enabled: runQuery && !!userData,
    onError: (error) => {
      if (error.message === "User already exists") {
        toast.info("User already exists");
      } else {
        toast.error("Error during sign-up");
        console.error("Error during sign-up:", error.message);
      }
      setRunQuery(false);
    },
    onSuccess: () => {
      toast.success("Email verification sent");
      setRunQuery(false);
    },
  });

  //check for errors before submit. Like user has not entered email or password
  useEffect(() => {
    if (errors.email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (errors.password) {
      setPassError(true);
    } else {
      setPassError(false);
    }
    if (errors.name) {
      setNameError(true);
    }
  }, [errors]);
  //submit from handler
  const onSubmit = (data) => {
    if (!emailError && !passError && nameError) {
      setUserData(data);
      setRunQuery(true);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="max-w-md md:max-w-lg lg:max-w-lg bg-white shadow w-full mx-auto flex items-center justify-center my-20">
        <form
          className="card-body w-[100%]"
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="card-title">Register</h3>

          {/* User Name Input */}
          <div className="form-control relative w-[100%]">
            <label className="label">
              <span className="label-text">User Name</span>
            </label>
            <div className="relative">
              {/* Icon */}
              <FaUserAlt
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              {/* Input Field */}
              <input
                type="text"
                placeholder="Enter Name"
                className={`input input-bordered w-[100%] pl-14 ${
                  nameError ? "animate-shake" : ""
                }`}
                {...register("username", {
                  required: {
                    value: true,
                    message: "User name required",
                  },
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Name contains only alphabets",
                  },
                  minLength: {
                    value: 5,
                    message: "Name must be at least 5 characters",
                  },
                })}
              />
            </div>
            {errors.name && (
              <span className="text-red">{errors.name.message}</span>
            )}
          </div>

          {/* Email Input */}
          <div className="form-control relative w-[100%]">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="relative">
              {/* Icon */}
              <FaEnvelope
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              {/* Input Field */}
              <input
                type="email"
                placeholder="Enter Email"
                className={`input input-bordered w-[100%] pl-14 ${
                  emailError ? "animate-shake" : ""
                }`}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email",
                  },
                })}
              />
            </div>
            {errors.email && (
              <span className="text-red">{errors.email.message}</span>
            )}
          </div>

          {/* Password Input */}
          <div className="form-control relative w-[100%]">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              {/* Icon */}
              <FaLock
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash size={21} /> : <FaEye size={21} />}
              </button>
              {/* Input Field */}
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className={`input input-bordered w-[100%] pl-14 ${
                  errors.password ? "animate-shake" : ""
                }`}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password required",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "Password must contain upper-case, lower-case, and number",
                  },
                })}
              />
            </div>
            {errors.password && (
              <span className="text-red">{errors.password.message}</span>
            )}
          </div>

          <div className="form-control mt-6">
            <input
              title="Register"
              type="submit"
              value="Register"
              className="btn bg-green text-white"
            />
          </div>
          <p className="text-center my-3">
            Already have Account?
            <Link to="/" className="underline text-red ml-4">
              Login Now
            </Link>
          </p>
        </form>
        {/* Social Sign Up Buttons */}
        {/* <div className="text-center space-x-10 mb-5">
          <button className="btn btn-circle">
            <FcGoogle size={40} />
          </button>
          <button className="btn btn-circle">
            <FaFacebook color="blue" size={40} />
          </button>
          <button className="btn btn-circle">
            <IoLogoWhatsapp color="green" size={40} />
          </button>
        </div> */}
      </div>
    </>
  );
}

export default SignUp;
