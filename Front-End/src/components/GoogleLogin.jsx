import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useAuthApi } from "../../customHooks/useAuthApi.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveUser } from "../../Redux/userSlice.js";
import { login } from "../../Redux/authSlice.js";
import { auth, googleProvider, signInWithPopup } from "../../FireBaseConfig.js";
import { GoogleAuthProvider } from "firebase/auth";
import Loading from "./Loading.jsx";
const GoogleSignIn = () => {
  const { googleSignIn } = useAuthApi();
  const [token, setToken] = useState(null);
  const [queryEnabled, setQueryEnabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useQuery(
    ["googleSignIn", token],
    () => {
      return googleSignIn(token);
    },
    {
      enabled: queryEnabled,
      onSuccess: (res) => {
        setQueryEnabled(false);
        dispatch(saveUser(res.user));
        dispatch(login());
        toast.success("Login Successfully");
        navigate("/", { replace: true });
      },
      onError: (error) => {
        setQueryEnabled(false);
        console.log(error);
        toast.error("Google Sign In Failed!");
      },
    }
  );

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      //Extracting Google ID tOKEN from the result
      const credentials = GoogleAuthProvider.credentialFromResult(result);
      const token = credentials.idToken;
      setToken(token);
      setQueryEnabled(true);
    } catch (error) {
      alert("Google Sign In Failed!");
      console.error(error);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <button
        type="button"
        className="btn btn-circle shadow-xl hover:shadow-2xl transition-shadow duration-200"
        onClick={() => handleGoogleLogin()}
      >
        <FcGoogle size={45} />
      </button>
    </>
  );
};

export default GoogleSignIn;
