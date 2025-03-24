import { dotSpinner } from "ldrs";
import "ldrs/lineSpinner";
import React from "react";
import { zoomies } from "ldrs"; // Default values shown

const LoaderComponent = () => {
  return (
    <div className="flex justify-center items-center h-96">
      {" "}
      <l-line-spinner
        size="40"
        stroke="3"
        speed="1"
        color="black"
      ></l-line-spinner>
    </div>
  );
};

export default LoaderComponent;
