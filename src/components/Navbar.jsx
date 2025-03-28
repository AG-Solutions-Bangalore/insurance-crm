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
        <div className="px-4 h-16 flex items-center ">
          <div className="flex items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-yellow-800"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col ml-4">
            <span className="text-sm font-bold text-yellow-900 leading-tight">
              Insurance
            </span>
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
