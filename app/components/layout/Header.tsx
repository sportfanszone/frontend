"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import HeaderNav from "../ui/HeaderNav";

interface HeaderProps {
  theme?: "dark" | "light" | "transparent" | null;
  className?: string;
}

const baseThemeStyles = {
  dark: "text-black backdrop-blur-2xl shadow-2xl",
  light: "backdrop-blur-2xl shadow-2xl",
};

const Header = ({ theme = null, className = "" }: HeaderProps) => {
  const [showHeader, setShowHeader] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  const isAtTop = scrollY === 0;

  const backgroundClass = useMemo(() => {
    if (theme === "transparent" && isAtTop) return "bg-transparent";
    return "bg-white/70";
  }, [theme, isAtTop]);

  const dynamicThemeClass = useMemo(() => {
    if (theme === "transparent") {
      if (isAtTop) return "text-white";
      return "text-black backdrop-blur-2xl shadow-2xl";
    }
    return baseThemeStyles[theme!] || "";
  }, [theme, isAtTop]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > scrollY && currentY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <header
      className={`${backgroundClass} ${dynamicThemeClass} flex justify-between items-center fixed top-0 left-0 w-full py-7 px-5 sm:px-10 md:px-17 z-50 transition-all duration-300 ${
        showHeader ? "translate-y-0" : "bigmd:-translate-y-full"
      } ${className}`}
    >
      <Image src="/images/logo.png" alt="Logo" width={160} height={160} />
      <HeaderNav theme={theme} />
    </header>
  );
};

export default Header;
