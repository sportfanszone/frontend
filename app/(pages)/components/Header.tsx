"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FiSearch, FiPlus, FiBell, FiMenu } from "react-icons/fi";
import { useSidebar } from "../context/SideBarContext";

const Header = () => {
  const { isBarOpen, toggleSidebar } = useSidebar();
  const [logo, setLogo] = useState("/images/logo.png");

  const updateLogo = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setLogo("/images/logoIcon.png");
    } else {
      setLogo("/images/logo.png");
    }
  };

  useEffect(() => {
    updateLogo();

    window.addEventListener("resize", updateLogo);
    return () => window.removeEventListener("resize", updateLogo);
  }, []);

  return (
    <div className="flex items-center justify-between p-2 gap-5 sm:gap-10 border-b-2 border-gray-200 sticky top-0 bg-white z-10 h-20">
      {/* Overlay for mobile sidebar */}
      {isBarOpen && (
        <div
          onClick={toggleSidebar}
          className="w-full h-screen absolute top-20 left-0 bg-black/50 md:hidden backdrop-blur-xs"
        />
      )}

      <div className="flex items-center justify-between gap-2">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={toggleSidebar}
          className="md:hidden cursor-pointer hover:opacity-90 transition mr-2 z-10"
        >
          <FiMenu className="w-5 h-5" />
        </button>

        {/* Logo */}
        <Image
          className="max-w-5.5 w-30 md:max-w-40 md:w-40"
          src={logo}
          alt="Logo"
          width={160}
          height={160}
        />
      </div>

      {/* Searchbar */}
      <div className="bg-white border-black/40 border-2 text-black rounded-full w-fit max-w-130 m-auto flex-1 flex justify-center items-center mx-auto py-[0px] px-1">
        <input
          className="py-1.5 px-2 w-[100%] outline-none"
          type="text"
          placeholder="Search your interest"
        />
        <button className="bg-black/40 text-white rounded-full cursor-pointer p-2 hover:opacity-90 transition">
          <FiSearch className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Nav */}
      <div className="text-2xl hidden sm:flex items-center justify-between gap-3">
        <button className="text-[0.9em] cursor-pointer relative">
          <FiBell />
          <div className="font-semibold bg-red-500 text-white text-[0.4em] grid content-center w-4 h-4 rounded-full absolute -top-1.5 -right-1">
            23
          </div>
        </button>
        <div className="text-[0.9em] flex items-center justify-between gap-    1 cursor-pointer">
          <FiPlus /> <span className="text-[0.8em] ">Create</span>
        </div>
        <div className="w-8 h-8 border-black/40 border-2 rounded-full cursor-pointer overflow-hidden">
          <Image
            src="/images/blankProfile.png"
            alt="Profile image"
            className="w-full h-full object-cover"
            width={50}
            height={50}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
