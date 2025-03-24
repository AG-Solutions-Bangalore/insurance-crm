import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ButtonCss } from "../../components/common/ButtonCss";
import { FORGOT_PASSWORD } from "../api/UseApi";
import ButtonConfigColor from "../../components/common/ButtonConfig";

const ForgetPassword = () => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validateMobile = (value) => {
    if (!value) return "Mobile number is required.";
    if (!/^\d{10}$/.test(value)) return "Enter a valid 10-digit mobile number.";
    return "";
  };

  const onResetPassword = async () => {
    const mobileError = validateMobile(mobile);
    if (mobileError) {
      setError(mobileError);
      toast.warning(mobileError);
      return;
    }
    setIsLoading(true);
    try {
      const res = await FORGOT_PASSWORD({ mobile });

      if (res.data.code === 200) {
        toast.success("New password sent to your email.");
        navigate("/signin");
      } else {
        toast.error("This mobile number is not registered.");
      }
    } catch (error) {
      toast.error("Error sending reset password. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#bab2f3] to-[#8B78FF]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Reset Password
        </h2>

        <div className="space-y-6">
          {/* Mobile Number Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              value={mobile}
              onChange={(e) => {
                const { value } = e.target;
                if (/^\d{0,10}$/.test(value)) {
                  setMobile(value);
                  setError(""); // Clear error on valid input
                }
              }}
              className="w-full bg-white text-gray-800 text-sm border-l-4 border border-gray-300 rounded-lg px-4 py-2 transition-all duration-300 ease-in-out focus:outline-none focus:border-l-4 focus:border-[#8B78FF] focus:ring-0 shadow-sm hover:shadow-md border-l-gray-300 border-r-gray-300"
              placeholder="Enter your Mobile Number"
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          <ButtonConfigColor
            onClick={onResetPassword}
            loading={isLoading}
            type="submit"
            buttontype="normal"
            label={isLoading ? "Restting..." : "Reset Password"}
            className="w-full"
          />
          {/* Back to Login Link */}
          <div className="text-center">
            <Link
              to="/"
              className="text-sm text-[#8B78FF] hover:text-[#7661f9]"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
