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
} from "react-icons/fi";

const LeftSidebar = () => {
  const { isBarOpen, toggleSidebar } = useSidebar();
  return (
    <div className="w-fit h-fit fixed md:sticky top-20 left-0 z-20">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`${
          isBarOpen ? "rotate-z-0" : "rotate-z-180"
        } bg-white absolute top-[50%] right-0 w-8 h-8 border-black/40 border-2 rounded-full cursor-pointer hidden md:grid place-content-center -translate-y-[100%] translate-x-[50%] transition-transform duration-500 hover:bg-gray-100 hover:border-black/60`}
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
            <nav className="flex flex-col gap-2 border-b-2 border-gray-200 pr-4 pb-4">
              <div className="flex items-center gap-2 text-md font-semibold">
                <FiHome className="inline-block mr-2 text-gray-700" />
                <a href="/" className="text-gray-700 hover:text-black">
                  Home
                </a>
              </div>
              <div className="flex items-center gap-2 text-md font-semibold">
                <FiUsers className="inline-block mr-2 text-gray-700" />
                <a href="#" className="text-gray-700 hover:text-black">
                  Teams
                </a>
              </div>
              <div className="flex items-center gap-2 text-md font-semibold">
                <FiCalendar className="inline-block mr-2 text-gray-700" />
                <a href="#" className="text-gray-700 hover:text-black">
                  Fixtures
                </a>
              </div>
              <div className="flex items-center gap-2 text-md font-semibold">
                <FiBarChart2 className="inline-block mr-2 text-gray-700" />
                <a href="#" className="text-gray-700 hover:text-black">
                  Standings
                </a>
              </div>
            </nav>

            {/* Colapsable nav */}
            <div className="flex flex-col gap-2">
              <div className="text-md font-semibold text-gray-700 flex items-center justify-start gap-2 cursor-pointer">
                <span>Resources</span> <FiChevronDown />
              </div>
              <nav className="flex flex-col gap-2 pl-3">
                <div className="flex items-center gap-2 text-md font-semibold">
                  <FiInfo className="inline-block mr-2 text-gray-700" />
                  <a href="/" className="text-gray-700 hover:text-black">
                    About SFZ
                  </a>
                </div>
                <div className="flex items-center gap-2 text-md font-semibold">
                  <FiUsers className="inline-block mr-2 text-gray-700" />
                  <a href="#" className="text-gray-700 hover:text-black">
                    Advertisement
                  </a>
                </div>
                <div className="flex items-center gap-2 text-md font-semibold">
                  <FiHelpCircle className="inline-block mr-2 text-gray-700" />
                  <a href="#" className="text-gray-700 hover:text-black">
                    Help
                  </a>
                </div>
                <div className="flex items-center gap-2 text-md font-semibold">
                  <FiHelpCircle className="inline-block mr-2 text-gray-700" />
                  <a href="#" className="text-gray-700 hover:text-black">
                    FAQs
                  </a>
                </div>
                <div className="flex items-center gap-2 text-md font-semibold">
                  <FiShield className="inline-block mr-2 text-gray-700" />
                  <a href="#" className="text-gray-700 hover:text-black">
                    Privacy Policy
                  </a>
                </div>
                <div className="flex items-center gap-2 text-md font-semibold">
                  <FiFileText className="inline-block mr-2 text-gray-700" />
                  <a href="#" className="text-gray-700 hover:text-black">
                    Terms of Service
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
