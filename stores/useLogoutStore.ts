import { create } from "zustand";

type LogoutStore = {
  showLogoutConfirm: boolean;
  setShowLogoutConfirm: (val: boolean) => void;
};

export const useLogoutStore = create<LogoutStore>((set) => ({
  showLogoutConfirm: false,
  setShowLogoutConfirm: (val) => set({ showLogoutConfirm: val }),
}));
