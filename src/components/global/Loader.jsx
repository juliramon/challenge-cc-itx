const Loader = ({ isLoaderVisible }) => {
  return (
    <span
      role="alert"
      aria-label="Loader indicator"
      className={`w-5 h-5 bg-blue-500 rounded-full absolute top-5 right-5 animate-ping ${
        isLoaderVisible ? "block" : "hidden"
      }`}
    >
      <span className="sr-only">Loading...</span>
    </span>
  );
};

export default Loader;
