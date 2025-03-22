import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemButton,
  Menu,
  MenuItem,
  Slide,
} from "@mui/material";
import { useState } from "react";
import {
  FaBars,
  FaChevronLeft,
  FaChevronRight,
  FaCompress,
  FaExpand,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { MdLock, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ChangePassword from "../pages/Profile/ChnagePassword";
import kmrLogo from "./../assets/kmrlive.png";
import { decryptData } from "./common/EncryptionDecryption";
import { ButtonCancel, ButtonCss } from "./common/ButtonCss";
import MobileBottomNav from "./common/Navbar/MobileBottomNav";
const Transition = (props) => <Slide direction="up" {...props} />;

const Navbar = ({
  toggleSidebar,
  isSidebarOpen,
  toggleCollapse,
  isCollapsed,
}) => {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const decryptedUsername = localStorage.getItem("username");
  const username = decryptData(decryptedUsername);

  const onChangePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword) {
      toast.error("Old password is required.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match.");
      return;
    }

    if (oldPassword === newPassword) {
      toast.error("New password cannot be the same as old password.");
      return;
    }

    const data = {
      old_password: oldPassword,
      password: newPassword,
      username: username,
    };

    try {
      const response = await CHNAGE_PASSWORD(data);

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
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    toast.success("Logged out successfully");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.log(`Error attempting to enable fullscreen: ${e.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50 ">
      <div className="hidden md:block">
        <div className="px-4 h-16 flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <img src={kmrLogo} alt="KMR Logo" className="h-8" />
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors block lg:hidden"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden lg:block"
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
            </button>
            <div className="relative">
              <IconButton
                onClick={handleClick}
                aria-label="Profile Menu"
                className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md text-white"
              >
                <FaUserCircle size={28} />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    className:
                      "shadow-xl rounded-lg border border-gray-200 bg-white min-w-[180px] p-1",
                  },
                }}
              >
                {/* Change Password */}
                <ListItemButton
                  onClick={() => {
                    handleClose();
                    setOpenDialog(true);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-blue-100 transition-all duration-300"
                >
                  <MdLock className="text-blue-600" size={22} />
                  <span className="text-gray-700 font-medium">
                    Change Password
                  </span>
                </ListItemButton>

                {/* Logout */}
                <ListItemButton
                  onClick={() => {
                    handleClose();
                    setIsLogoutDialogOpen(true);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-red-100 transition-all duration-300"
                >
                  <MdLogout className="text-red-600" size={22} />
                  <span className="text-gray-700 font-medium">Logout</span>
                </ListItemButton>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={isLogoutDialogOpen}
        fullWidth
        maxWidth="sm"
        TransitionComponent={Slide}
        transitionDuration={500}
        sx={{
          backdropFilter: "blur(4px)",
        }}
        keepMounted
        onClose={() => setIsLogoutDialogOpen(false)}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle
          id="logout-dialog-title"
          sx={{ fontWeight: 600, fontSize: "1.5rem" }}
        >
          {" "}
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => setIsLogoutDialogOpen(false)}
            className={ButtonCancel}
          >
            Cancel
          </button>
          <button onClick={handleLogout} className={ButtonCss}>
            Logout
          </button>
        </DialogActions>
      </Dialog>
      <ChangePassword
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onChangePassword={onChangePassword}
        oldPassword={oldPassword}
        setOldPassword={setOldPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />
      {/* <MobileBottomNav /> */}
    </nav>
  );
};

export default Navbar;
