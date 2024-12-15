import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { CLIENT_ID_GOOGLE_SIGN_IN } from "../../Global.js";
import { useQuery } from "react-query";
import { useUserApi } from "../../customHooks/useUserApi.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveUser } from "../../Redux/userSlice.js";
import { login } from "../../Redux/authSlice.js";

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

  const handleSuccess = (response) => {
    setToken(response.credential);
    setQueryEnabled(true);
  };

  const handleError = () => {
    console.error("Login Failed!");
  };

  return isLoading ? (
    <p>LoadingCard....</p>
  ) : (
    <GoogleOAuthProvider clientId={CLIENT_ID_GOOGLE_SIGN_IN}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        render={(renderProps) => (
          <button
            className="btn btn-circle bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center w-14 h-14"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <FcGoogle size={28} /> {/* Adjust size of the icon */}
          </button>
        )}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
