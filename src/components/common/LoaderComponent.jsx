import { ClipLoader } from "react-spinners";

const LoaderComponent = () => {
  return (
    <div className="flex justify-center items-center h-80">
      <ClipLoader size={50} color="#8B78FF" />
    </div>
  );
};

export default LoaderComponent;
