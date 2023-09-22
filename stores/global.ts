import { User } from "@/modules/users/types";
import { create } from "zustand";

export const useLayoutStore = create<{
  isShowSidebar: boolean;
  setIsShowSidebar: (isShowSidebar: boolean) => void;
  toggleIsShowSidebar: () => void;
}>((set) => ({
  isShowSidebar: true,
  setIsShowSidebar: (isShowSidebar: boolean) => set({ isShowSidebar }),
  toggleIsShowSidebar: () =>
    set((state) => ({ isShowSidebar: !state.isShowSidebar })),
}));

export const useAuthStore = create<{
  user: User | null;
  setUser: (user: User) => void;
}>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));
