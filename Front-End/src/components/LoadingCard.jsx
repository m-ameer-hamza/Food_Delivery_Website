function LoadingCard({ idx }) {
  return (
    <div
      key={idx}
      className="card bg-gray-100 w-[350px] h-[430px] shadow-xl rounded-lg flex items-center justify-center"
    >
      <span className="loading loading-spinner loading-lg text-green"></span>
    </div>
  );
}

export default LoadingCard;
