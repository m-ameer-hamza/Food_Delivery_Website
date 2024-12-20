function Loading() {
  return (
    <div className="fixed inset-0 bg-slate-500 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center gap-3">
          <span className="loading loading-bars font-bold loading-xs bg-green"></span>
          <span className="loading loading-bars font-bold loading-sm bg-green"></span>
          <span className="loading loading-bars font-bold loading-md bg-green"></span>
          <span className="loading loading-bars font-bold loading-lg bg-green"></span>
        </div>
        <p className="mt-4 text-white text-xl font-bold">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
