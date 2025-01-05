import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

import { useQuery } from "react-query";
import { useUserApi } from "../../customHooks/useUserApi.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveUser } from "../../Redux/userSlice.js";
import { login } from "../../Redux/authSlice.js";

import { auth, googleProvider, signInWithPopup } from "../../FireBaseConfig.js";
import { GoogleAuthProvider } from "firebase/auth";

const GoogleSignIn = () => {
  const { googleSignIn } = useUserApi();
  const [token, setToken] = useState(null);
  const [queryEnabled, setQueryEnabled] = useState(false);
  const dispatch = useDispatch();

  const { data, isError, isLoading, isSuccess } = useQuery(
    ["googleSignIn", token],
    () => {
      return googleSignIn(token);
    },
    {
      enabled: queryEnabled,
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

  //runs when there is error
  useEffect(() => {
    if (isError) {
      toast.error("Google Sign In Failed!");
    }
  }, [isError]);

  //dispatch action to set data in user slice
  useEffect(() => {
    if (data) {
      dispatch(saveUser(data.user));
    }
  }, [data, dispatch]);

  //dispatch action to login user
  useEffect(() => {
    if (isSuccess) {
      dispatch(login());
    }
  }, [isSuccess, dispatch]);

  return (
    <button
      className="btn btn-circle bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center w-14 h-14"
      onClick={() => handleGoogleLogin()}
    >
      <FcGoogle size={28} /> {/* Adjust size of the icon */}
    </button>
  );
};

export default GoogleSignIn;
