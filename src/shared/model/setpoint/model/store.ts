import { createWithEqualityFn } from "zustand/traditional";
import { ISetpoints } from "./type";
export const useSetpoints = createWithEqualityFn<ISetpoints>((set, get) => ({
    setpointsValues: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    setpointOffsets: {
        bool: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        int: [16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76],
        float: [
            80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132,
            136, 140,
        ],
        analog: [],
    },
    setSetpoints(newSetpointsValues) {
        set({ setpointsValues: [...newSetpointsValues] });
    },
    setSetpointOffsets(setpointOffsets, type) {
        set({
            setpointOffsets: {
                ...get().setpointOffsets,
                [type]: [...setpointOffsets],
            },
        });
    },
}));
