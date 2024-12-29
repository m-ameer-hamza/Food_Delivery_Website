import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useUserApi } from "../../customHooks/useUserApi";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/authSlice";

import { saveUser } from "../../Redux/userSlice";
import { useNavigate, useLocation } from "react-router-dom";

function LoginForm({ handleModel }) {
  const [emailError, setEmailError] = useState(true);
  const [passError, setPassError] = useState(true);
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || { from: { pathname: "/" } };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { emailLogin } = useUserApi();

  const {
    data: LoginData,
    isError,
    isLoading,
    error,
  } = useQuery(
    "loginUser",
    () => {
      return emailLogin(userData.email, userData.password);
    },
    { enabled: !!userData }
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

  //
  useEffect(() => {
    if (LoginData) {
      if (LoginData.status === 200) {
        //dispatch login action to change the state of the user and auth
        dispatch(login());
        dispatch(saveUser(LoginData.data.user));
        toast.success("Login Successfully");
        navigate(from, { replace: true });
      }
    }
  }, [LoginData]);

  useEffect(() => {
    if (isError) {
      if (error.status === 404) {
        toast.warning("User not found");
      } else if (error.status === 400) {
        toast.error("Email and password are required");
      } else if (error.status === 500) {
        toast.error("Internal server error");
      } else if (error.status === 409) {
        toast.warning("User signed up with google");
      } else if (error.status === 401) {
        toast.error("Incorrect password");
      }
    }
    setUserData(null);
  }, [isError, error]);

  return (
    <form
      className="card-body"
      method="dialog"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="card-title">Login</h3>
      {isLoading && <Loading />}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
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
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
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
          })}
        />
        {errors.password && (
          <span className="text-red">{errors.password.message}</span>
        )}
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
        <Link
          to="/signup"
          className="underline text-red ml-4"
          onClick={handleModel}
        >
          Signup Now
        </Link>
      </p>
      {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-2">
        ✕
      </button> */}
    </form>
  );
}

export default LoginForm;
