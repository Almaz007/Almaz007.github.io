import { TViewConfig } from "@/entities/editor/model/types/view";
import { FifoViewStructure } from "./FifoViewStructure";

export const FifoViews: TViewConfig = {
    fifoByte: {
        view: FifoViewStructure,
        width: 100,
        height: 140,
        name: "FIFO byte",
        withoutEn: false,
    },
    fifoWord: {
        view: FifoViewStructure,
        width: 100,
        height: 140,
        name: "FIFO word",
        withoutEn: false,
    },
    fifoByteWithoutEn: {
        view: FifoViewStructure,
        width: 100,
        height: 140,
        name: "FIFO byte Without En",
        withoutEn: true,
    },
    fifoWordWithoutEn: {
        view: FifoViewStructure,
        width: 100,
        height: 140,
        name: "FIFO word Without En",
        withoutEn: true,
    },
};
