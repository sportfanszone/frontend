"use client";
import { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Leagues", href: "#" },
  { name: "Recents", href: "#" },
  { name: "Trending", href: "#" },
  { name: "About", href: "#" },
];

const HeaderNav = ({ theme = null }: { theme?: string | null }) => {
  const [navOpen, setNavOpen] = useState(false);
  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };

  let themeClass;
  switch (theme) {
    case "dark":
      themeClass = "bg-white text-black";
      break;
    case "light":
      themeClass = "bg-white bigmd:bg-transparent";
      break;
    case "transparent":
      themeClass = "bg-transparent";
      break;
    default:
      themeClass = "text-black bigmd:text-white";
      break;
  }

  return (
    <>
      <div
        className={`${
          navOpen ? "absolute" : "hidden bigmd:block"
        } ${themeClass} backdrop-blur-sm bigmd:backdrop-blur-none bigmd:relative right-0 top-0 rounded-bl-lg bigmd:h-fit h-screen`}
        onClick={handleNavToggle}
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
        <span
          className={`${
            theme === "light"
              ? "text-white"
              : theme === "dark"
              ? "text-dark"
              : ""
          } font-light`}
        >
          Login
        </span>
        <button className="bg-white font-semibold text-black py-1 px-4 ml-3 rounded-3xl flex justify-between items-center gap-1 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
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
