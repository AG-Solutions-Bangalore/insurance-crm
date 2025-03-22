import React from "react";

const TextField = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  name,
  options = [], // For dropdown options
  width,
}) => {
  return (
    <div className={`${width == "full" ? "w-full" : "max-w-sm min-w-[200px]"}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Render Input or Dropdown based on type */}
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full bg-white text-gray-800 text-sm border-l-4 border border-gray-300 rounded-lg px-4 py-2 transition-all duration-300 ease-in-out focus:outline-none focus:border-l-4 focus:border-blue-500 focus:ring-0 shadow-sm hover:shadow-md border-l-gray-300 border-r-gray-300"
        >
          <option value="" disabled>
            {placeholder || "Select an option"}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full bg-white text-gray-800 text-sm border-l-4  border border-gray-300 rounded-lg px-4 py-2 transition-all duration-300 ease-in-out focus:outline-none focus:border-l-4 focus:border-blue-500 focus:ring-0 shadow-sm hover:shadow-md border-l-gray-300 border-r-gray-300"
        />
      )}
    </div>
  );
};

export default TextField;
