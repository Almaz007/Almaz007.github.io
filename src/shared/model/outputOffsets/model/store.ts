import { createWithEqualityFn } from "zustand/traditional";
import { IOffsetData } from "@/shared/types/dataTypes";

export const useOuputOffsets = createWithEqualityFn<IOffsetData>(
    (set, get) => ({
        offsetsByTypes: {
            bool: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            int: [
                16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76,
            ],
            float: [
                80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132,
                136, 140,
            ],
            analog: [
                150, 230, 310, 390, 470, 550, 630, 710, 790, 870, 950, 1030,
                1110, 1190, 1270, 1350,
            ],
        },

        setOffsets(offsets, type) {
            set({
                offsetsByTypes: {
                    ...get().offsetsByTypes,
                    [type]: [...offsets],
                },
            });
        },
    })
);
