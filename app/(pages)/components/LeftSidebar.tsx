"use client";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/app/(pages)/context/SideBarContext";
import {
  FiChevronRight,
  FiHome,
  FiUsers,
  FiCalendar,
  FiBarChart2,
  FiGrid,
} from "react-icons/fi";
import LeftSidebarLink from "@/app/components/ui/LeftSidebarLink";

const navItems = [
  { href: "/", text: "Home", icon: FiHome },
  { href: "/leagues", text: "Leagues", icon: FiUsers },
  { href: "/Fixtures", text: "Leagues", icon: FiCalendar },
  { href: "/Standings", text: "Leagues", icon: FiBarChart2 },
];

import { LeftSidebarProps } from "@/types";

const LeftSidebar = ({ user }: LeftSidebarProps) => {
  const pathName = usePathname();
  const { isBarOpen, toggleSidebar } = useSidebar();
  return (
    <div className="w-fit h-fit fixed md:sticky top-20 left-0 z-20">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`${
          isBarOpen ? "rotate-z-0" : "rotate-z-180"
        } bg-white absolute top-[50%] right-0 w-8 h-8 border-black/20 border-2 rounded-full cursor-pointer hidden md:grid place-content-center -translate-y-[100%] translate-x-[50%] transition-transform duration-500 hover:bg-gray-100 hover:border-black/60 z-10`}
      >
        <FiChevronRight />
      </button>

      <div
        className={`${
          isBarOpen ? "min-w-58 w-58 p-4" : "min-w-0 w-0 p-0 md:ml-6"
        } rounded-tr-2xl rounded-br-2xl min-h-[calc(100vh-5em)] max-h-[calc(100vh-5em)] border-r-2 border-gray-200 overflow-hidden transition-all duration-300 ease-in-out bg-white`}
      >
        <div
          className={`${
            isBarOpen ? "translate-x-0" : "-translate-x-[100%]"
          } w-56 transition-all duration-400 ease-in-out`}
        >
          {/* Sidebar Content */}
          <div className="flex flex-col gap-4">
            <nav className="flex flex-col gap-6 pr-4 pb-4">
              {navItems.map(({ href, text, icon }, index) => (
                <LeftSidebarLink
                  key={index}
                  href={href}
                  text={text}
                  isActive={href === pathName}
                  icon={icon}
                />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
