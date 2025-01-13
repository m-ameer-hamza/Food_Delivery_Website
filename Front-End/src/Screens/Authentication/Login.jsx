import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useAuthApi } from "../../../customHooks/useAuthApi.js";
import { toast } from "react-toastify";
import Loading from "../../components/Loading.jsx";
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/authSlice.js";
import { saveUser } from "../../../Redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import FacebookLogin from "../../components/FaceBookLogin.jsx";
import GoogleLogin from "../../components/GoogleLogin.jsx";
function LoginForm() {
  const [emailError, setEmailError] = useState(true);
  const [passError, setPassError] = useState(true);
  const [userData, setUserData] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { emailLogin } = useAuthApi();

  const { isLoading } = useQuery(
    "loginUser",
    () => {
      return emailLogin(userData.email, userData.password);
    },
    {
      enabled: !!userData,
      onSuccess: (res) => {
        if (res.status === 200) {
          //dispatch login action to change the state of the user and auth
          dispatch(login());
          dispatch(saveUser(res.data.user));
          toast.success("Login Successfully");
          //user will be re-directed to home page and replace the current page
          //so that user can not go back to login page
          navigate("/", { replace: true });
        }
      },
      onError: (error) => {
        if (error.status === 404) {
          toast.warning("User not found");
        } else if (error.status === 409) {
          toast.warning("User signed up with google");
        } else if (error.status === 401) {
          toast.error("Invalide Credentials");
        } else {
          console.log(error);
          toast.error("Internal server error");
        }

        //setting user data to nul so query will not run again
        setUserData(null);
      },
    }
  );

  //useEffect to check if there is any error in email and password
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
  }, [errors]);

  //submit from handler
  const onSubmit = (data) => {
    if (!emailError && !passError) {
      // console.log("Login Successfully", data);
      setUserData(data);
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      <div className="max-w-md md:max-w-lg lg:max-w-lg bg-white shadow w-full mx-auto flex items-center justify-center my-20">
        <form
          className="card-body w-full px-8"
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Centered Login Text */}
          <h3 className="card-title text-center text-xl font-semibold mb-6">
            Login
          </h3>

          {/* Email Input */}
          <div className="form-control relative w-full mb-6">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <div className="relative">
              <FaEnvelope
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="email"
                placeholder="Enter Email"
                className={`input input-bordered w-full pl-14 ${
                  errors.password ? "animate-shake" : ""
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
          <div className="form-control relative w-full mb-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
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
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className={`input input-bordered w-full pl-14 ${
                  errors.password ? "animate-shake" : ""
                }`}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password required",
                  },
                })}
              />
            </div>
            {errors.password && (
              <span className="text-red">{errors.password.message}</span>
            )}
          </div>

          {/* Forget Password Link */}
          <div className="text-right mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forget Password?
            </Link>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <input
              title="Login"
              type="submit"
              value="Login"
              className="btn bg-green text-white"
            />
          </div>

          {/* Footer */}
          <p className="text-center my-3">
            Do not have an account?
            <Link to="/signup" className="underline text-red ml-4">
              Sign Up Now
            </Link>
          </p>

          {/* Social Login Section */}
          <div className="my-8">
            {/* Line with Centered Text */}
            <div className="flex items-center mb-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 font-semibold">
                Social Login
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Circular Buttons */}
            <div className="flex justify-center space-x-12">
              {/* Google Button */}
              <GoogleLogin />

              {/* Facebook Button */}
              <FacebookLogin />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
