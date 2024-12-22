import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUserApi } from "../../../customHooks/useUserApi";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
function SignUp() {
  const [emailError, setEmailError] = useState(true);
  const [passError, setPassError] = useState(true);
  const [nameError, setNameError] = useState(true);
  const [userData, setUserData] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { emailSignUp } = useUserApi();

  const {
    isLoading,
    isError,
    data: apiData,
    error,
  } = useQuery(
    "emailSignUp",
    () => {
      return emailSignUp(userData.email, userData.password, userData.name);
    },
    {
      enabled: !!userData,
    }
  );

  //check for errors before submit
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
    }
  };

  //run query when userData change.This will trigger the useQuery hook

  useEffect(() => {
    if (apiData) {
      if (apiData.status === 201) {
        toast.success("User Registered Successfully");
        //navigate to login page
      }
    }
    setUserData(null);
  }, [apiData]);

  useEffect(() => {
    if (isError) {
      if (error.status === 409) {
        toast.error("User already exists");
      } else {
        toast.error("Error in registering");
      }
    }
    setUserData(null);
  }, [isError]);

  return (
    <div className="max-w-md md:max-w-lg lg:max-w-lg bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <form
        className="card-body w-[100%]"
        method="dialog"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="card-title">Register</h3>
        {/* User Name Input */}
        {isLoading && <Loading />}

        <div className="form-control">
          <label className="label">
            <span className="label-text">User Name</span>
          </label>
          {/* Email Input Field */}
          <input
            type="text"
            placeholder="Enter Name"
            className={`input input-bordered ${
              nameError ? "animate-shake" : ""
            }`}
            {...register("name", {
              required: {
                value: true,
                message: "name required",
              },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "name contains only alphabets",
              },
              minLength: {
                value: 5,
                message: "name must be at least 5 characters",
              },
            })}
          />
          {errors.name && (
            <span className="text-red">{errors.name.message}</span>
          )}
        </div>
        {/* Email Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          {/* Email Input Field */}
          <input
            type="email"
            placeholder="Enter Email"
            className={`input input-bordered ${
              emailError ? "animate-shake" : ""
            }`}
            {...register("email", {
              required: {
                value: true,
                message: "email required",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "invalide email",
              },
            })}
          />
          {errors.email && (
            <span className="text-red">{errors.email.message}</span>
          )}
        </div>
        {/* Password Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          {/* Password Input Field */}
          <input
            type="password"
            placeholder="Enter Password"
            className={`input input-bordered ${
              errors.password ? "animate-shake" : ""
            }`}
            {...register("password", {
              required: {
                value: true,
                message: "password required",
              },
              minLength: {
                value: 8,
                message: "password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message:
                  "password must contain upper-case, lower-case and number",
              },
            })}
          />
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
            disabled={isLoading}
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
  );
}

export default SignUp;
