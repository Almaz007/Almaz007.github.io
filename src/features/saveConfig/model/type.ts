import { TNodeInstructionsTypes } from "@/entities/editor";
import { TDataType } from "@/shared/types";

export type TBaseScript = {
    inType: number;
    instructionOffset: number;
    resultOffsets: number[];
    sourcesOffsets: number[];
};

export type TFourierScript = Omit<TBaseScript, "instructionOffset">;
export type TFifoScript = TBaseScript & {
    ptrBegin: number;
    lengthMemory: number;
    workingSpace: number;
};
export type TScriptItem = TBaseScript | TFourierScript | TFifoScript;

export type TInstructionsBuffer = {
    lastLength: number;
    instructions: number[];
    offsets: number[];
    primitivesData: Partial<
        Record<
            TNodeInstructionsTypes,
            Record<number, { lengthInBytes: number; offset: number }>
        >
    >;
};
export type TOffsetsByOutputs = Record<TDataType, number[]>;
export type TOffsetsStore = Record<TDataType, number[]>;
