import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { CLIENT_ID_GOOGLE_SIGN_IN } from "../../Global.js";
import { useQuery } from "react-query";
import { useUserApi } from "../../customHooks/useUserApi.js";

const GoogleSignIn = () => {
  const { googleSignIn } = useUserApi();
  const [token, setToken] = useState(null);
  const [queryEnabled, setQueryEnabled] = useState(false);

  const { data, isError, isLoading } = useQuery(
    ["googleSignIn", token],
    () => {
      return googleSignIn(token);
    },
    {
      enabled: queryEnabled,
    }
  );

  useEffect(() => {
    if (data) {
      console.log("Fetched data:", data);
    }
  }, [data]);

  const handleSuccess = (response) => {
    setToken(response.credential);
    setQueryEnabled(true);
  };

  const handleError = () => {
    console.error("Login Failed!");
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID_GOOGLE_SIGN_IN}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        render={(renderProps) => (
          <button
            className="btn btn-circle bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center w-14 h-14" // Set explicit width & height
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
