import { FaHome, FaUser } from "react-icons/fa";
import { useState } from "react";
import { IconCalendarWeek, IconMessage } from "@tabler/icons-react";

const MobileBottomNav = () => {
  const [active, setActive] = useState("home");

  const getIconColor = (name) =>
    active === name ? "text-[#8B78FF]" : "text-gray-500";

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white pt-3 flex justify-around items-center gap-1 rounded-xl">
      {[
        { name: "home", icon: <FaHome size={22} /> },
        { name: "calendar", icon: <IconCalendarWeek size={22} /> },
        { name: "messages", icon: <IconMessage size={22} /> },
        { name: "profile", icon: <FaUser size={22} /> },
      ].map(({ name, icon }) => (
        <button
          key={name}
          onClick={() => setActive(name)}
          className={`flex flex-col items-center w-[80px] transition-all ${getIconColor(
            name
          )}`}
        >
          {icon}
          {active === name && (
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
