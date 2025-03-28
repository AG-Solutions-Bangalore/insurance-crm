import { Visibility, VisibilityOff } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import ButtonConfigColor from "../../components/common/ButtonConfig";
import {
  decryptData,
  encryptData,
  validateEnvironment,
} from "../../components/common/EncryptionDecryption";
import { PANEL_LOGIN } from "../api/UseApi";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile Number must be exactly 10 digits")
      .required("Mobile Number is required"),
    password: Yup.string()
      .min(2, "Password should be at least 2 characters long")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      mobile: "",
      password: "",
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Submitting:", values);
      if (!formik.isValid) {
        console.log("Validation Failed:", formik.errors);
        return;
      }
      try {
        validateEnvironment();
      } catch (error) {
        toast({
          title: "Error",
          description: "Invalid environment detected!",
          variant: "destructive",
        });
        return;
      }
      setIsLoading(true);
      try {
        const response = await PANEL_LOGIN(values);
        const data = response.data;
        if (response.status == 200 && data.data.token) {
          const token = data.data.token;
          const username = data.data.user.name;
          const userType = data.data.user.user_type;
          console.log(token, "token");
          console.log(username, "username");
          console.log(userType, "userType");
          const encryptedToken = encryptData(token);
          const encryptedUsername = encryptData(username);
          const encryptedUserType = encryptData(userType);

          localStorage.setItem("token", encryptedToken);
          localStorage.setItem("username", encryptedUsername);
          localStorage.setItem("user_type", encryptedUserType);

          console.log("Stored Encrypted Token:", encryptedToken);
          console.log("Stored Encrypted Username:", encryptedUsername);
          console.log("Stored Encrypted User Type:", encryptedUserType);

          const storedEncryptedToken = localStorage.getItem("token");
          const storedEncryptedUsername = localStorage.getItem("username");
          const storedEncryptedUserType = localStorage.getItem("user_type");

          const decryptedToken = decryptData(storedEncryptedToken);
          const decryptedUsername = decryptData(storedEncryptedUsername);
          const decryptedUserType = decryptData(storedEncryptedUserType);

          if (
            decryptedToken === token &&
            decryptedUsername === username &&
            decryptedUserType == userType
          ) {
            navigate("/home");
            toast.success("Login Successful.");
          } else {
            toast.error("Data mismatch, please try again.");
          }
        } else {
          console.error("Error:", data.msg || "No token returned in response.");
          toast.error("Login failed. Username and password are incorrect.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image Section */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#bab2f3] to-[#8B78FF]  relative">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
          <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
          <p className="text-lg text-center">
            Manage your spice, oil, and seed inventory effortlessly with our
            CRM.
          </p>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        {/* <img
  src="https://images.immediate.co.uk/production/volatile/sites/30/2024/10/Soybean-oil-4695c4f.jpg?quality=90&resize=440,400"
  alt="SignIn Illustration"
  className="w-full h-full object-cover"
/>; */}
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2  flex flex-col justify-center items-center p-4 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            {/* <img
              src={siginLogo} 
              alt="Logo"
              className=" w-full h-20"
            /> */}
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Welcome Back, Sign In
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formik.values.mobile}
                onChange={(e) => {
                  const { value } = e.target;
                  if (/^\d{0,10}$/.test(value)) {
                    formik.setFieldValue("mobile", value);
                  }
                }}
                onBlur={formik.handleBlur}
                className="w-full bg-white text-gray-800 text-sm border-l-4 border border-gray-300 rounded-lg px-4 py-2 transition-all duration-300 ease-in-out focus:outline-none focus:border-l-4 focus:border-[#8B78FF] focus:ring-0 shadow-sm hover:shadow-md border-l-gray-300 border-r-gray-300"
                placeholder="Enter your Mobile Number"
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.mobile}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-white text-gray-800 text-sm border-l-4 border border-gray-300 rounded-lg px-4 py-2 transition-all duration-300 ease-in-out focus:outline-none focus:border-l-4 focus:border-[#8B78FF] focus:ring-0 shadow-sm hover:shadow-md border-l-gray-300 border-r-gray-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={handleClickShowPassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  tabIndex={-1}
                  id="rememberMe"
                  name="rememberMe"
                  color="primary"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 text-sm text-gray-700"
                >
                  Remember Me
                </label>
              </div>
              <Link
                tabIndex={-1}
                to="/forget-password"
                className="text-sm text-[#8B78FF] hover:text-[#7661f9]"
              >
                Forgot Password?
              </Link>
            </div>
            {/* <button
              type="submit"
              disabled={isLoading}
              className={`${ButtonCss} w-full`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button> */}

            <ButtonConfigColor
              loading={isLoading}
              type="submit"
              buttontype="normal"
              label={isLoading ? "Signing In..." : "Sign In"}
              className="w-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
