import Image from "next/image";
import { FiSearch, FiPlus, FiBell } from "react-icons/fi";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-2 gap-5 sm:gap-10 border-b-2 border-gray-200 sticky top-0 bg-white z-10 h-20">
      {/* Logo */}
      <Image
        className="w-30 sm:w-30 md:w-40"
        src="/images/logo.png"
        alt="Logo"
        width={160}
        height={160}
      />

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
            src="/images/premierLeagueLogo.png"
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
