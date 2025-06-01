"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type SidebarContextType = {
  isBarOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isBarOpen, setIsBarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsBarOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isBarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
