import { createWithEqualityFn } from "zustand/traditional";
import { IOffsetData } from "./type";

export const useOffsets = createWithEqualityFn<IOffsetData>((set, get) => ({
    offsetsByTypes: {
        bool: [],
        int: [],
        float: [],
        analog: [],
    },
    offsetsOsc: [],
    setOscOffsets(newOffsets) {
        set({ offsetsOsc: newOffsets });
    },
    setOffsets(offsets, type) {
        set({
            offsetsByTypes: { ...get().offsetsByTypes, [type]: [...offsets] },
        });
    },
}));
