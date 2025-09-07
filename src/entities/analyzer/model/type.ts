import { TDataType } from "@/shared/types";

export type TOscilografOffsetData = Record<
    number,
    {
        dataType: TDataType;
        name: string;
        lengthMemory: number;
        send: boolean;
        timePoints: number[];
        values: number[];
    }
>;

export type TAnalyzerStore = {
    oscillographicOffsets: TOscilografOffsetData;
    setOscillographicOffsets: () => void;
    initOscillographicOffsets: (
        offset: number,
        name: string,
        lengthMemory: number,
        dataType: TDataType
    ) => void;
    toggleSend: (offset: number) => void;
    checkOffset: (offset: number) => void;
    updateOscillographicData: (
        newOffsetsData: Record<
            number,
            { timePoints: number[]; values: number[] }
        >
    ) => void;
};
