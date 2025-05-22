"use client";
import { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { name: "Properties", href: "#" },
  { name: "Properties", href: "#" },
  { name: "Buy", href: "#" },
  { name: "Rent", href: "#" },
  { name: "About", href: "#" },
];

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
        } bg-white/60 bigmd:bg-transparent backdrop-blur-sm text-black bigmd:text-white bigmd:relative right-0 top-0 rounded-bl-lg`}
      >
        <button
          onClick={handleNavToggle}
          className="cursor-pointer mx-auto mt-5 block bigmd:hidden"
        >
          <FiX className="size-5.5 text-black" />
        </button>
        <nav className="flex flex-col bigmd:flex-row bgimd:font-light bigmd:flex justify-between items-center bigmd:gap-6">
          {navItems.map((item, index) => (
            <Link
              className="px-22 py-7 bigmd:p-0 w-full text-center hover:bg-black/10"
              href={item.href}
              key={index}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="hidden bigmd:flex justify-between items-center gap-1">
        <span className="font-light">Login</span>
        <button className="bg-white font-semibold text-black py-1 px-4 ml-3 rounded-3xl flex justify-between items-center gap-1 cursor-pointer">
          <span>Signup</span>
          <FiArrowRight className="size-5.5" />
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
