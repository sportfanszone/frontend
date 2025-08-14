"use client";

import { useRouter } from "next/navigation";
import { useLogoutStore } from "@/stores/useLogoutStore";

export const useLogout = () => {
  const router = useRouter();
  const { setShowLogoutConfirm } = useLogoutStore();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });

    setShowLogoutConfirm(false);
    router.push("/auth/login");
  };

  return logout;
};
