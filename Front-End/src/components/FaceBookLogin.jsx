import { FaFacebook } from "react-icons/fa";
function FaceBookLogin() {
  return (
    <button
      type="button"
      className="btn btn-circle shadow-xl hover:shadow-2xl transition-shadow duration-200"
    >
      <FaFacebook color="blue" size={45} />
    </button>
  );
}

export default FaceBookLogin;
