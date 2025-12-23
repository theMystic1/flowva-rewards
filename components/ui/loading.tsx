export const LoadingUi = () => {
  return (
    <div className="w-full h-dvh items-center justify-center flex bg-white">
      <img
        src="/icons/flowva_loader.png"
        className="w-50 animate-pulse-scale"
        alt="Loading..."
      />
    </div>
  );
};
