import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SidebarStore = {
  isOpen: boolean;
  isHover: boolean;
  toggleOpen: () => void;
  setIsOpen: (isOpen: boolean) => void;
  getOpenState: () => boolean;
};

export const useSidebar = create(
  persist<SidebarStore>(
    (set, get) => ({
      isOpen: true,
      isHover: false,
      toggleOpen: () => {
        set({ isOpen: !get().isOpen });
      },
      setIsOpen: (isOpen: boolean) => {
        set({ isOpen });
      },
     
      getOpenState: () => {
        const state = get();
        return state.isOpen
      },
    }),
    {
      name: "sidebar",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
