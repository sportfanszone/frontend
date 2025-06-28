"use client";
import { useSidebar } from "../context/SideBarContext";

import {
  FiChevronRight,
  FiChevronDown,
  FiHome,
  FiUsers,
  FiCalendar,
  FiBarChart2,
  FiHelpCircle,
  FiInfo,
  FiFileText,
  FiShield,
  FiGrid,
} from "react-icons/fi";

import { LeftSidebarProps } from "@/types";

const LeftSidebar = ({ user }: LeftSidebarProps) => {
  const { isBarOpen, toggleSidebar } = useSidebar();
  return (
    <div className="w-fit h-fit fixed md:sticky top-20 left-0 z-20">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`${
          isBarOpen ? "rotate-z-0" : "rotate-z-180"
        } bg-white absolute top-[50%] right-0 w-8 h-8 border-black/40 border-2 rounded-full cursor-pointer hidden md:grid place-content-center -translate-y-[100%] translate-x-[50%] transition-transform duration-500 hover:bg-gray-100 hover:border-black/60 z-10`}
      >
        <FiChevronRight />
      </button>

      <div
        className={`${
          isBarOpen ? "min-w-58 w-58 p-4" : "min-w-0 w-0 p-0 md:ml-6"
        } min-h-[calc(100vh-5em)] max-h-[calc(100vh-5em)] border-r-2 border-gray-200 overflow-hidden transition-all duration-300 ease-in-out bg-white`}
      >
        <div
          className={`${
            isBarOpen ? "translate-x-0" : "-translate-x-[100%]"
          } w-56 transition-all duration-400 ease-in-out`}
        >
          {/* Sidebar Content */}
          <div className="flex flex-col gap-4">
            <nav className="flex flex-col gap-8 pr-4 pb-4">
              <div className="flex items-center gap-3 text-md font-semibold">
                <div className="bg-black/12 w-10 h-10 rounded-lg grid place-content-center">
                  <FiHome className="inline-block text-gray-700" />
                </div>
                <a href="/" className="text-gray-700 hover:text-black">
                  Home
                </a>
              </div>
              <div className="flex items-center gap-3 text-md font-semibold">
                <div className="bg-black/12 w-10 h-10 rounded-lg grid place-content-center">
                  <FiUsers className="inline-block text-gray-700" />
                </div>
                <a href="#" className="text-gray-700 hover:text-black">
                  Leagues
                </a>
              </div>
              <div className="flex items-center gap-3 text-md font-semibold">
                <div className="bg-black/12 w-10 h-10 rounded-lg grid place-content-center">
                  <FiCalendar className="inline-block text-gray-700" />
                </div>
                <a href="#" className="text-gray-700 hover:text-black">
                  Fixtures
                </a>
              </div>
              <div className="flex items-center gap-3 text-md font-semibold">
                <div className="bg-black/12 w-10 h-10 rounded-lg grid place-content-center">
                  <FiBarChart2 className="inline-block text-gray-700" />
                </div>
                <a href="#" className="text-gray-700 hover:text-black">
                  Standings
                </a>
              </div>
              {user ? (
                <div className="flex items-center gap-3 text-md font-semibold">
                  <div className="bg-black/12 w-10 h-10 rounded-lg grid place-content-center">
                    <FiGrid className="inline-block text-gray-700" />
                  </div>
                  <a
                    href="/user/dashboard"
                    className="text-gray-700 hover:text-black"
                  >
                    Dashboard
                  </a>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 text-md font-semibold">
                    <div className="bg-black/12 w-10 h-10 rounded-lg grid place-content-center">
                      <FiCalendar className="inline-block text-gray-700" />
                    </div>
                    <a
                      href="/auth/login"
                      className="text-gray-700 hover:text-black"
                    >
                      Login
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-md font-semibold">
                    <div className="bg-black/12 w-10 h-10 rounded-lg grid place-content-center">
                      <FiCalendar className="inline-block mr-2 text-gray-700" />
                    </div>
                    <a
                      href="/auth/signup"
                      className="text-gray-700 hover:text-black"
                    >
                      Signup
                    </a>
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
