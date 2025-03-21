import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";
import { ButtonCancel, ButtonCss } from "../../components/common/ButtonCss";

// Reusable Input Component
const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  validate,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => {
        if (!validate || validate(e.target.value)) {
          onChange(e.target.value);
        }
      }}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

// Main ChangePassword Component
const ChangePassword = ({
  open,
  onClose,
  onChangePassword,
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        TransitionComponent={Slide}
        transitionDuration={500}
        sx={{ backdropFilter: "blur(4px)" }}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <form onSubmit={onChangePassword} className="space-y-4">
            <InputField
              label="Old Password"
              type="password"
              value={oldPassword}
              onChange={setOldPassword}
              required
            />
            <InputField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={setNewPassword}
              required
              // validate={(value) => value.length >= 8}
            />
            <InputField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <button onClick={onClose} className={ButtonCancel}>
            Cancel
          </button>
          <button onClick={onChangePassword} className={ButtonCss}>
            Change Password
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangePassword;
