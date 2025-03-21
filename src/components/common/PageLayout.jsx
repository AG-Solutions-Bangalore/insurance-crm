import React from "react";

const PageLayout = ({ children }) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-r-4 border-blue-500 rounded-xl p-6 shadow-lg">
      {children}
    </div>
  );
};

export default PageLayout;
