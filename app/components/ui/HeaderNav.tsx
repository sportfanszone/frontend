"use client";
import { useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";

const HeaderNav = () => {
  const [navOpen, setNavOpen] = useState(false);
  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };
  return (
    <>
      <div
        className={`${
          navOpen ? "absolute" : "hidden bigmd:block"
        } bg-white/60 bigmd:bg-transparent backdrop-blur-sm text-black bigmd:text-white bigmd:relative right-0 top-0`}
      >
        <button
          onClick={handleNavToggle}
          className="cursor-pointer mx-auto mt-5 block bigmd:hidden"
        >
          <FiX className="size-5.5 text-black" />
        </button>
        <nav className="flex flex-col bigmd:flex-row bgimd:font-light bigmd:flex justify-between items-center bigmd:gap-6">
          <Link
            className="px-22 py-7 bigmd:p-0 w-full text-center hover:bg-black/10"
            href="#"
          >
            Properties
          </Link>
          <Link
            className="px-22 py-7 bigmd:p-0 w-full text-center hover:bg-black/10"
            href="#"
          >
            Properties
          </Link>
          <Link
            className="px-22 py-7 bigmd:p-0 w-full text-center hover:bg-black/10"
            href="#"
          >
            Buy
          </Link>
          <Link
            className="px-22 py-7 bigmd:p-0 w-full text-center hover:bg-black/10"
            href="#"
          >
            Rent
          </Link>
          <Link
            className="px-22 py-7 bigmd:p-0 w-full text-center hover:bg-black/10"
            href="#"
          >
            About
          </Link>
        </nav>
      </div>

      <div className="hidden bigmd:flex justify-between items-center gap-1">
        <span className="font-light">contact us</span>
        <button className="bg-white font-semibold text-black py-1 px-4 ml-3 rounded-3xl flex justify-between items-center gap-1 cursor-pointer">
          <span>Booking now</span>
          <FiSearch className="size-5.5" />
        </button>
      </div>

      {!navOpen && (
        <button
          onClick={handleNavToggle}
          className="cursor-pointer bigmd:hidden"
        >
          <FiMenu className="size-5.5" />
        </button>
      )}
    </>
  );
};

export default HeaderNav;
