import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, label2, onBack }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between w-full bg-white p-4 rounded-xl shadow-lg border-l-4 border-r-4 border-blue-600 mt-3 mb-4">
      {/* Left Section: Back Button & Title */}
      <div className="flex items-center space-x-3">
        {/* Back Arrow Button */}
        <button
          onClick={onBack || (() => navigate(-1))}
          className="flex items-center justify-center w-10 h-10 bg-blue-50 text-blue-600 rounded-lg shadow border border-blue-300 hover:bg-blue-600 hover:text-white transition-all"
        >
          <FaArrowLeft className="text-lg" />
        </button>

        {/* Page Title */}
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>

      {/* Right Section: Optional Label2 */}
      {label2 && (
        <div className="text-base font-semibold text-gray-700 bg-blue-50 px-4 py-2 rounded-lg shadow border border-blue-300">
          {label2}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
