import { FaHome, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IconCalendarWeek, IconMessage } from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const getIconColor = (path) =>
    active === path ? "text-[#8B78FF]" : "text-gray-500";

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white pt-3 flex justify-around items-center gap-1 rounded-xl">
      {[
        { name: "home", icon: <FaHome size={22} />, path: "/home" },
        {
          name: "calendar",
          icon: <IconCalendarWeek size={22} />,
          path: "/client-list",
        },
        {
          name: "messages",
          icon: <IconMessage size={22} />,
          path: "/renewal-list",
        },
        { name: "profile", icon: <FaUser size={22} />, path: "/home" },
      ].map(({ name, icon, path }) => (
        <button
          key={name}
          onClick={() => navigate(path)}
          className={`flex flex-col items-center w-[80px] transition-all ${getIconColor(
            path
          )}`}
        >
          {icon}
          {active === path && (
            <div className="w-[71px] h-[21px] mt-1 relative flex justify-center">
              <svg
                viewBox="0 0 71 21"
                className="absolute top-0 left-0"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0,21 C25,2 25,10 71,21" fill="#8B78FF" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default MobileBottomNav;
