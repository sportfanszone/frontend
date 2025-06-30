import Link from "next/link";

import { LeftSidebarLinkProps } from "@/types";

const LeftSidebarLink = ({ href, text, icon: Icon }: LeftSidebarLinkProps) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-gray-700 text-md font-semibold"
    >
      <div className="bg-black/12 w-10 h-10 rounded-lg grid place-content-center">
        <Icon className="inline-block" />
      </div>
      {text}
    </Link>
  );
};

export default LeftSidebarLink;
