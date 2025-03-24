import React from "react";

const PageLayout = ({ children }) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-r-4 border-[#8B78FF] rounded-xl p-6 shadow-lg">
      {children}
    </div>
  );
};

export default PageLayout;
