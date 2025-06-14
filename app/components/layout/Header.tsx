"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "@/app/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Topics", href: "#" },
  { name: "FAQs", href: "#" },
  { name: "About", href: "#" },
];

interface HeaderProps {
  theme?: "dark" | "light" | "transparent" | null;
  className?: string;
}

const Header = ({ theme = null, className = "" }: HeaderProps) => {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleLoggout = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok || data.status === "success") {
        router.push("/auth/login");
        setIsLoggedIn(false);
        Toast.fire({
          icon: "success",
          title: "Logout successful",
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Logout failed",
      });
    }
  };

  const { isLoggedIn, setIsLoggedIn } = useAuth();
  console.log("isLoggedIn:", isLoggedIn);
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
        <Image
          className="w-30 sm:w-30 md:w-40"
          src="/images/logo.png"
          alt="Logo"
          width={160}
          height={160}
        />

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
        {isLoggedIn ? (
          <div className="hidden md:flex items-center justify-between gap-6">
            <button className="cursor-pointer" onClick={handleLoggout}>
              Logout
            </button>
            <Link
              href="/auth/dashboard"
              className="bg-white font-semibold text-black py-1 px-4 ml-3 rounded-3xl flex items-center gap-1 shadow-md hover:shadow-xl transition-all"
            >
              <span>Profile</span>
              <FiArrowRight className="size-5.5" />
            </Link>
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
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
