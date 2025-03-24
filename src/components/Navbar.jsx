import { Slide } from "@mui/material";
import { useState } from "react";
import { FaBars, FaCompress, FaExpand, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import kmrLogo from "./../assets/kmrlive.png";
const Transition = (props) => <Slide direction="up" {...props} />;

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

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
            {/* <img src={kmrLogo} alt="KMR Logo" className="h-8" /> */}
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
