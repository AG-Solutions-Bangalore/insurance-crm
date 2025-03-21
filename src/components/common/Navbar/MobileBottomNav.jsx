import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShield } from "react-icons/md";

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const theme = useTheme();
  // Only show this component for small screens (e.g., below 'sm')
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!isMobile) return null;

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Navigate based on selected tab
    switch (newValue) {
      case 0:
        navigate("/home");
        break;
      case 1:
        navigate("/client-list");
        break;
      case 2:
        navigate("/renewal-list");
        break;
      default:
        break;
    }
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300, // higher than most app bars
      }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction label="Home" icon={<FiHome size={20} />} />
        <BottomNavigationAction label="Client" icon={<FaRegUser size={20} />} />
        <BottomNavigationAction
          label="Renewal"
          icon={<MdOutlineShield size={20} />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileBottomNav;
