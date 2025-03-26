import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemButton,
  Menu,
  Slide,
} from "@mui/material";
import { IconCalendarWeek, IconHome, IconMessage } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdLock, MdLogout } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CHANGE_PASSWORD } from "../../../pages/api/UseApi";
import ChangePassword from "../../../pages/Profile/ChnagePassword";
import ButtonConfigColor from "../ButtonConfig";
import { decryptData } from "../EncryptionDecryption";

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);

  const [loadingdata, setLoadingData] = useState(false);
  const decryptedUsername = localStorage.getItem("username");
  const username = decryptData(decryptedUsername);
  const [formData, setFormData] = useState({
    old_password: "",
    password: "",
    conform_password: "",
    username: username,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const isActive = (paths) =>
    paths.some((path) => active.startsWith(path.replace(":id", "")));

  const getIconColor = (paths) =>
    isActive(paths) ? "text-[#8B78FF]" : "text-gray-500";

  const handleClose = () => setAnchorEl(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const onChangePassword = async (e) => {
    e.preventDefault();

    if (!formData.old_password) return toast.error("Old password is required.");
    if (formData.password.length < 2)
      return toast.error("New password must be at least 2 characters long.");
    if (formData.password !== formData.conform_password)
      return toast.error("Passwords don't match.");
    if (formData.old_password === formData.password)
      return toast.error("New password cannot be the same as old password.");

    const data = {
      old_password: formData.old_password,
      password: formData.password,
      username,
    };
    setLoadingData(true);
    try {
      const response = await CHANGE_PASSWORD(data);
      if (response.data.code === 200) {
        toast.success("Password Updated Successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setOpenDialog(false);
        navigate("/home");
      } else {
        toast.error("Incorrect old password. Please try again.");
      }
    } catch (error) {
      toast.error("Error changing password. Please try again later.");
    } finally {
      setLoadingData(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md pt-3 flex justify-around items-center rounded-t-2xl shadow-xl z-50 h-[75px] transition-all duration-300 ">
        {[
          { name: "home", icon: <IconHome size={24} />, path: ["/home"] },
          {
            name: "calendar",
            icon: <IconCalendarWeek size={24} />,
            path: [
              "/client-list",
              "/policy-list",
              "/client-create",
              "/client-update",
              "/policy-update",
            ],
          },
          {
            name: "messages",
            icon: <IconMessage size={24} />,
            path: ["/renewal-list"],
          },
          {
            name: "profile",
            icon: <FaUser size={24} />,
            path: null,
            onClick: handleClick,
          },
        ].map(({ name, icon, path, onClick }) => (
          <button
            key={name}
            onClick={onClick || (() => navigate(path[0]))}
            className={`flex flex-col items-center w-[85px] transition-transform duration-300 ${getIconColor(
              path || []
            )} hover:scale-110`}
          >
            {icon}
            {isActive(path || []) && (
              <div className="w-[71px] h-[30px] mt-1 relative flex justify-center">
                <svg
                  viewBox="0 0 71 30"
                  className="absolute top-0 left-0"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0,30 C25,5 25,15 71,30" fill="#8B78FF" />
                </svg>
              </div>
            )}
          </button>
        ))}

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              className:
                "shadow-xl rounded-lg border border-gray-200 bg-white min-w-[200px] p-2",
            },
          }}
        >
          {/* Change Password */}
          <ListItemButton
            onClick={() => {
              handleClose();
              setOpenDialog(true);
            }}
            className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-blue-100 transition-all duration-300"
          >
            <MdLock className="text-blue-600" size={24} />
            <span className="text-gray-700 font-medium">Change Password</span>
          </ListItemButton>

          {/* Logout */}
          <ListItemButton
            onClick={() => {
              handleClose();
              setIsLogoutDialogOpen(true);
            }}
            className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-red-100 transition-all duration-300"
          >
            <MdLogout className="text-red-600" size={24} />
            <span className="text-gray-700 font-medium">Logout</span>
          </ListItemButton>
        </Menu>

        {/* Logout Confirmation Dialog */}
        <Dialog
          open={isLogoutDialogOpen}
          fullWidth
          maxWidth="sm"
          TransitionComponent={Slide}
          transitionDuration={500}
          sx={{ backdropFilter: "blur(4px)" }}
          keepMounted
          onClose={() => setIsLogoutDialogOpen(false)}
          aria-labelledby="logout-dialog-title"
        >
          <DialogTitle
            id="logout-dialog-title"
            className="font-semibold text-xl"
          >
            Confirm Logout
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="flex justify-center space-x-3 my-4">
            <ButtonConfigColor
              onClick={handleLogout}
              type="submit"
              buttontype="normal"
              label={"Logout"}
            />
            <ButtonConfigColor
              type="button"
              buttontype="back"
              label="Back"
              onClick={() => setIsLogoutDialogOpen(false)}
            />
          </DialogActions>
        </Dialog>

        {/* Change Password Dialog */}
        <ChangePassword
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onChangePassword={onChangePassword}
          formData={formData}
          handleChange={handleChange}
          loadingdata={loadingdata}
        />
      </div>
    </>
  );
};

export default MobileBottomNav;
