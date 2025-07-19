"use client";

import { useState, useEffect } from "react";
import { useLogoutStore } from "@/stores/useLogoutStore";
import { useSidebar } from "@/app/(pages)/context/SideBarContext";
import { HeaderProps } from "@/types";

import Image from "next/image";
import Link from "next/link";
import UserAvatar from "@/app/components/ui/UserAvatar";
import { FiSearch, FiBell, FiMenu, FiArrowRight } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/app/components/ui/dropdown-menu";
import { Logout } from "@/app/components/ui/Logout";
import { Badge } from "@/app/components/ui/badge";
import CreatePost from "@/app/components/ui/CreatePost";

const Header = ({ user }: HeaderProps) => {
  const { setShowLogoutConfirm } = useLogoutStore();
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
      {user ? (
        <div className="text-2xl flex items-center justify-between gap-3">
          <button className="text-[0.9em] cursor-pointer relative">
            <FiBell />
            <Badge
              className="absolute top-0 right-0 translate-x-[45%] -translate-y-[50%] h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
              variant="destructive"
            >
              99+
            </Badge>
          </button>

          {/* Create post dialog */}
          <CreatePost />

          {/* User Avatar and Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-8 h-8 border-black/40 border-2 rounded-full cursor-pointer overflow-hidden">
                <UserAvatar
                  alt={`${user.firstName} ${user.middleName} ${user.lastName}`}
                  src={user.profileImageUrl}
                  className="w-full h-full object-cover"
                  width={50}
                  height={50}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <Link href="/user/dashboard">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href="/user/settings">
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </Link>
                <Link href="/ad">
                  <DropdownMenuItem>Advert</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => setShowLogoutConfirm(true)}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Logout />
        </div>
      ) : (
        <div className="hidden md:flex items-center justify-between gap-6 pr-2">
          <Link href="/auth/login">Login</Link>
          <Link
            href="/auth/signup"
            className="bg-white font-semibold text-black py-1 px-4 ml-3 rounded-3xl flex items-center gap-1 shadow-md hover:shadow-xl transition-all"
          >
            <span>Signup</span>
            <FiArrowRight className="size-5.5" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
