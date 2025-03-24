import { Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import React from "react";
import ButtonConfigColor from "../../components/common/ButtonConfig";
import TextField from "../../components/common/InputField";

const ChangePassword = ({
  open,
  onClose,
  onChangePassword,
  loadingdata,
  handleChange,
  formData = {},
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
        maxWidth="sm"
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <form onSubmit={onChangePassword} className="space-y-4">
            <TextField
              label="Old Password"
              type="password"
              name="old_password"
              value={formData?.old_password || ""}
              onChange={handleChange}
              required
              width="full"
            />
            <TextField
              label="New Password"
              type="password"
              name="password"
              value={formData?.password || ""}
              onChange={handleChange}
              required
              width="full"
            />
            <TextField
              label="Confirm Password"
              type="password"
              name="conform_password"
              value={formData?.conform_password || ""}
              onChange={handleChange}
              required
              width="full"
            />
            <div className="flex flex-col items-center justify-center space-y-3 md:space-y-0 my-4 md:flex-row md:space-x-3">
              <ButtonConfigColor
                loading={loadingdata}
                type="submit"
                buttontype="normal"
                label={"Change Password"}
              />
              <ButtonConfigColor
                type="button"
                buttontype="back"
                label="Back"
                onClick={onClose}
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangePassword;
