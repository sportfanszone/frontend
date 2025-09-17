import Image from "next/image";
import Link from "next/link";

import { navItems, otherNavItems } from "@/data";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-3 sm:py-5 md:py-7 px-5 sm:px-10 md:px-15 lg:px-17">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-3 md:mb-8">
        <div className="">
          <Image
            className="mb-4 mx-auto md:mx-0 w-26 md:w-30"
            src="/images/logo.png"
            alt="Sportfanszone Logo"
            width={100}
            height={100}
          />
          <nav className="flex flex-wrap gap-4 mt-2 md:mt-0 mx-auto md:mx-0 justify-center md:justify-start">
            {navItems.map((item, index) => (
              <Link className="text-xs md:text-sm" key={index} href={item.href}>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="text-center md:text-right text-sm md:text-base">
          20 online
        </div>
      </div>

      <hr />

      <div className="text-black/60 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <p className="text-sm md:text-base text-center md:text-left mt-4">
          &copy; {new Date().getFullYear()} Sportfanszone. All rights reserved.
        </p>
        <nav className="flex flex-wrap gap-4 mt-2 md:mt-0 mx-auto md:mx-0 justify-center md:justify-end">
          {otherNavItems.map((item, index) => (
            <Link
              className="text-xs md:text-sm text-center md:text-right"
              key={index}
              href={item.href}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
