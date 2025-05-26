"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import HeaderNav from "../ui/HeaderNav";

interface HeaderProps {
  theme?: "dark" | "light" | "transparent" | null;
  className?: string;
}

const Header = ({ theme = null, className = "" }: HeaderProps) => {
  const [showHeader, setShowHeader] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isAtTop = scrollY === 0;

  const backgroundClass = useMemo(() => {
    if (theme === "transparent") {
      if (isAtTop) return "bg-transparent";
      if (showHeader) return "bg-white/70";
      return "bg-transparent";
    }
    return "bg-white/70";
  }, [theme, isAtTop, showHeader]);

  const blurClass = useMemo(() => {
    if (!showHeader) return ""; // no blur when hidden
    if (theme === "transparent" && isAtTop) return ""; // no blur at top
    return "backdrop-blur-2xl";
  }, [theme, isAtTop, showHeader]);

  const textClass = useMemo(() => {
    if (theme === "transparent") {
      return isAtTop ? "text-white" : "text-black";
    }
    return theme === "dark" ? "text-black" : "";
  }, [theme, isAtTop]);

  const shadowClass = useMemo(() => {
    if (!showHeader) return ""; // no shadow when hidden
    if (theme === "transparent" && isAtTop) return "";
    return "shadow-md";
  }, [theme, isAtTop, showHeader]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastScrollY;

      if (isScrollingDown && currentY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentY);
      setScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`${backgroundClass} ${blurClass} ${textClass} ${shadowClass}
        fixed top-0 left-0 w-full z-50 flex justify-between items-center
        py-7 px-5 sm:px-10 md:px-17 transition-all duration-300
        ${showHeader ? "translate-y-0" : "bigmd:-translate-y-full"}
        ${className}`}
    >
      <Image src="/images/logo.png" alt="Logo" width={160} height={160} />
      <HeaderNav theme={theme} />
    </header>
  );
};

export default Header;
