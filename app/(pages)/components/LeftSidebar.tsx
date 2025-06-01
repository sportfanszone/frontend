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
  return (
    <div>
      {/* Toggle Button */}
      <button className="bg-white absolute top-[50%] right-0 w-8 h-8 border-black/40 border-2 rounded-full cursor-pointer grid place-content-center -translate-y-[100%] translate-x-[50%]">
        <FiChevronRight />
      </button>

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
  );
};

export default LeftSidebar;
