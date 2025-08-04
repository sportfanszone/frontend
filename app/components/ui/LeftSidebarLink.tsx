import Link from "next/link";

import { LeftSidebarLinkProps } from "@/types";

const LeftSidebarLink = ({
  href,
  text,
  isActive,
  icon: Icon,
}: LeftSidebarLinkProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 text-gray-800 text-md font-semibold rounded-xl transition-all duration-300 ease-in-out ${
        isActive
          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
          : "text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700"
      } px-4 py-3`}
    >
      <div
        className={`w-10 h-10 rounded-lg grid place-content-center ${
          isActive ? "bg-white/20 text-white" : "bg-blue-100/50 text-blue-600"
        } transition-colors duration-300`}
      >
        <Icon className="inline-block" />
      </div>
      {text}
    </Link>
  );
};

export default LeftSidebarLink;
