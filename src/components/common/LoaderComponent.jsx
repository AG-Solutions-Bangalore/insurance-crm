// import "ldrs/lineSpinner";
// import React from "react";

// const LoaderComponent = () => {
//   return (
//     <div className="flex justify-center items-center h-96">
//       {" "}
//       <l-line-spinner
//         size="40"
//         stroke="3"
//         speed="1"
//         color="black"
//       ></l-line-spinner>
//     </div>
//   );
// };

// export default LoaderComponent;
import { Spinner } from "@radix-ui/themes";

const LoaderComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner size="3" />
    </div>
  );
};

export default LoaderComponent;
