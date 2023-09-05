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
