import { createWithEqualityFn } from "zustand/traditional";
import { TAnalyzerStore } from "./type";
import { TDataType } from "@/shared/types";

export const useAnalyzerStore = createWithEqualityFn<TAnalyzerStore>(
    (set, get) => ({
        oscillographicOffsets: {},
        setOscillographicOffsets: () => {},
        initOscillographicOffsets: (
            offset,
            name,
            lengthMemory,
            dataType: TDataType
        ) => {
            const { oscillographicOffsets } = get();

            const existing = oscillographicOffsets[offset];

            set((prev) => ({
                oscillographicOffsets: {
                    ...prev.oscillographicOffsets,
                    [offset]: existing
                        ? { ...existing, name }
                        : {
                              name,
                              send: false,
                              timePoints: [],
                              values: [],
                              lengthMemory,
                              dataType,
                          },
                },
            }));
        },

        toggleSend: (offset) => {
            set((prev) => ({
                ...prev,
                ["oscillographicOffsets"]: {
                    ...prev["oscillographicOffsets"],
                    [offset]: {
                        ...prev["oscillographicOffsets"][offset],
                        send: !prev["oscillographicOffsets"][offset].send,
                    },
                },
            }));
        },

        checkOffset: (offset) => {
            const { oscillographicOffsets } = get();
            const prevOffsets = Object.entries(oscillographicOffsets);
            if (
                prevOffsets.findIndex(
                    (offsetData) => offsetData[0] === String(offset)
                ) !== -1
            ) {
                const newOffsets = Object.fromEntries(
                    prevOffsets.filter(
                        ([offsetData]) => offsetData[0] !== String(offset)
                    )
                );

                set({ oscillographicOffsets: { ...newOffsets } });
            }
        },

        updateOscillographicData: (
            newOffsetsData: Record<
                number,
                { timePoints: number[]; values: number[] }
            >
        ) => {
            set((prev) => {
                const updatedOffsets: typeof prev.oscillographicOffsets = {
                    ...prev.oscillographicOffsets,
                };

                Object.entries(newOffsetsData).forEach(([offsetStr, data]) => {
                    const offset = Number(offsetStr);
                    const existing = updatedOffsets[offset];
                    if (existing) {
                        updatedOffsets[offset] = {
                            ...existing,
                            timePoints: [...data.timePoints],
                            values: [...data.values],
                        };
                    }
                });
                // Object.entries(newOffsetsData).forEach(([offsetStr, data]) => {
                //     const offset = Number(offsetStr);
                //     const existing = updatedOffsets[offset];
                //     if (existing) {
                //         updatedOffsets[offset] = {
                //             ...existing,
                //             timePoints: [
                //                 ...updatedOffsets[offset].timePoints,
                //                 ...data.timePoints,
                //             ],
                //             values: [
                //                 ...updatedOffsets[offset].values,
                //                 ...data.values,
                //             ],
                //         };
                //     }
                // });

                return { oscillographicOffsets: updatedOffsets };
            });
        },
    })
);
