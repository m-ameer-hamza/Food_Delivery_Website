import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useAuthApi } from "../../../customHooks/useAuthApi";
import { toast } from "react-toastify";

function VerifyEmail() {
  const { verifyEmail } = useAuthApi();
  const [runQuery, setRunQuery] = useState(false);

  const { isLoading } = useQuery("verifyEmail", verifyEmail, {
    enabled: runQuery,
    onSuccess: () => {
      toast.success("User Created Successfully");
      localStorage.removeItem("userId");
      setRunQuery(false);
    },
    onError: (error) => {
      toast.error(error.message);
      setRunQuery(false);
    },
  });

  useEffect(() => {
    setRunQuery(true);
  }, []);

  return isLoading ? (
    <div className="flex flex-col space-y-10 md:flex-row md:space-y-0 items-center justify-center h-screen">
      <span className="md:mr-12 text-2xl">Verifying and saving Data</span>
      <span className="loading loading-spinner loading-lg bg-green"></span>
    </div>
  ) : (
    <div className="flex flex-col space-y-4 items-center justify-center h-screen">
      <span className="text-xl px-10 text-center">
        Email Verification done. You can proceed to Login...
      </span>
      <button className="btn bg-green text-white px-10">Login</button>
    </div>
  );
}

export default VerifyEmail;
