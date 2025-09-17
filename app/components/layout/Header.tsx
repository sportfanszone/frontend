"use client";
import { useState, useEffect, useMemo, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import { useLogoutStore } from "@/stores/useLogoutStore";
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
import UserAvatar from "@/app/components/ui/UserAvatar";
import { UserContext } from "@/app/context/UserContext";

import { navItems } from "@/data";

interface HeaderProps {
  theme?: "dark" | "light" | "transparent" | null;
  className?: string;
}

const Header = ({ theme = null, className = "" }: HeaderProps) => {
  const { user } = useContext(UserContext);
  const { setShowLogoutConfirm } = useLogoutStore();
  const [navOpen, setNavOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  const isAtTop = scrollY === 0;

  const handleNavToggle = () => setNavOpen((prev) => !prev);

  // Handle header visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowHeader(!(currentY > lastScrollY && currentY > 50));
      setLastScrollY(currentY);
      setScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const computedClasses = useMemo(() => {
    const base = [
      "fixed top-0 left-0 w-full z-50 flex justify-between items-center md:gap-10",
      "py-3 sm:py-5 md:py-7 px-5 sm:px-10 md:px-15 lg:px-17",
      "transition-all duration-300",
      showHeader ? "translate-y-0" : "-translate-y-full",
    ];

    if (theme === "transparent") {
      base.push(isAtTop ? "bg-transparent" : "bg-white/70");
      base.push(isAtTop ? "text-white" : "text-black");
    } else {
      base.push("bg-white/70", "text-black");
    }

    if (!(theme === "transparent" && isAtTop)) {
      base.push("backdrop-blur-2xl", "shadow-md");
    }

    if (className) base.push(className);

    return base.join(" ");
  }, [theme, isAtTop, showHeader, className]);

  return (
    <>
      <header className={computedClasses}>
        <Link href="/">
          <Image
            className="w-40 sm:w-40 md:w-50"
            src="/images/logo.png"
            alt="Logo"
            width={160}
            height={160}
          />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="hover:opacity-65 transition-all"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Navigation */}
        {user ? (
          <div className="hidden md:flex">
            {/* User Avatar and Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <UserAvatar
                    alt={`${user.firstName?.[0]}${user.lastName?.[0]}`}
                    src={user.profileImageUrl}
                    className="text-base cursor-pointer"
                  />
                  <p>@{user.username}</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <Link href="/user/dashboard">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <Link href="#">
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </Link>
                  <Link href="#">
                    <DropdownMenuItem>Advert</DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => setShowLogoutConfirm(true)}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="hidden md:flex items-center justify-between gap-6">
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

        {/* Login/Signup Buttons */}

        {/* Mobile Menu Button */}
        {!navOpen && (
          <button
            onClick={handleNavToggle}
            className="cursor-pointer md:hidden"
          >
            <FiMenu className="size-5.5" />
          </button>
        )}
      </header>

      {/* Mobile Overlay & Menu */}
      {navOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={handleNavToggle}
          ></div>

          {/* Mobile Menu */}
          <div className="md:hidden fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white/75 backdrop-blur-md shadow-lg z-50 px-6 py-8 flex flex-col gap-6">
            <button
              onClick={handleNavToggle}
              className="self-end text-black cursor-pointer"
            >
              <FiX className="size-6" />
            </button>

            <nav className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={handleNavToggle}
                  className="text-black text-lg font-medium hover:bg-black/10 py-2 rounded-md transition"
                >
                  {item.name}
                </Link>
              ))}

              {user ? (
                <div>
                  {/* User Avatar and Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <UserAvatar
                          alt={`${user.firstName?.[0]}${user.lastName?.[0]}`}
                          src={user.profileImageUrl}
                          className="text-base cursor-pointer"
                        />
                        <p>@{user.username}</p>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuGroup>
                        <Link href="/user/dashboard">
                          <DropdownMenuItem>Profile</DropdownMenuItem>
                        </Link>
                        <Link href="#">
                          <DropdownMenuItem>Settings</DropdownMenuItem>
                        </Link>
                        <Link href="#">
                          <DropdownMenuItem>Advert</DropdownMenuItem>
                        </Link>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => setShowLogoutConfirm(true)}
                      >
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={handleNavToggle}
                    className="text-black text-lg font-semibold hover:bg-black/10 py-2 rounded-md transition"
                  >
                    Login
                  </Link>

                  <Link
                    href="/auth/signup"
                    onClick={handleNavToggle}
                    className="bg-black text-white py-2 px-4 rounded-full flex items-center gap-2 justify-center"
                  >
                    Signup <FiArrowRight />
                  </Link>
                </>
              )}
            </nav>
          </div>
        </>
      )}
      <Logout />
    </>
  );
};

export default Header;
