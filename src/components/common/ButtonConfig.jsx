import React from "react";
import { FaArrowLeft, FaCheck, FaEdit, FaPlus } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { IconSend } from "@tabler/icons-react";

const ButtonConfigColor = ({
  type,
  label,
  onClick,
  disabled,
  loading,
  className,
  buttontype,
}) => {
  const getButtonStyles = () => {
    switch (buttontype) {
      case "submit":
        return "px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#8B78FF] via-[#8B78FF] to-[#8B78FF] rounded-lg shadow-md hover:from-[#8B78FF] hover:via-[#5451D6] hover:to-[#5451D6] transition-all duration-300 ease-in-out transform hover:scale-105";
      case "back":
        return "px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105";
      case "create":
        return "px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#8B78FF] via-[#8B78FF] to-[#8B78FF] rounded-lg shadow-md hover:from-[#8B78FF] hover:via-[#5451D6] hover:to-[#5451D6] transition-all duration-300 ease-in-out transform hover:scale-105";
      case "update":
        return "px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#8B78FF] via-[#8B78FF] to-[#8B78FF] rounded-lg shadow-md hover:from-[#8B78FF] hover:via-[#5451D6] hover:to-[#5451D6] transition-all duration-300 ease-in-out transform hover:scale-105";

      case "normal":
        return "px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#8B78FF] via-[#8B78FF] to-[#8B78FF] rounded-lg shadow-md hover:from-[#8B78FF] hover:via-[#5451D6] hover:to-[#5451D6] transition-all duration-300 ease-in-out transform hover:scale-105";
      default:
        return "bg-blue-400 hover:bg-blue-500 text-white";
    }
  };

  // Define icons based on the type
  const getIcon = () => {
    if (loading) return <FiLoader className="animate-spin text-lg" />;
    switch (buttontype) {
      case "submit":
        return <IconSend className="w-4 h-4" />;
      case "back":
        return <FaArrowLeft />;
      case "create":
        return <FaPlus />;
      case "update":
        return <FaEdit />;

      default:
        return null;
    }
  };

  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${getButtonStyles()} ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : ""
      } ${className || ""}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      <div className="flex items-center justify-center gap-2 text-sm">
        {getIcon()}
        <span className="whitespace-nowrap">{label}</span>
      </div>
    </button>
  );
};

export default ButtonConfigColor;
