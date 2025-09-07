import { createWithEqualityFn } from "zustand/traditional";
import { ISidebarMenuState } from "./interfaces";

export const useSidebarMenuStore = createWithEqualityFn<ISidebarMenuState>(
    (set) => ({
        sidebarVisible: false,

        setSidebarVisible(sidebarVisible: boolean) {
            set({ sidebarVisible });
        },
    })
);
