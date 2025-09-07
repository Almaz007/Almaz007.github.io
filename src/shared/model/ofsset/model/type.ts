import { TDataType } from "@/shared/types";
export type TOffsetOsc = {
    offset: number;
    length: number;
};
export interface IOffsetData {
    offsetsByTypes: Record<TDataType, number[]>;
    offsetsOsc: TOffsetOsc[];
    setOscOffsets: (newOffsets: TOffsetOsc[]) => void;
    setOffsets: (offsets: number[], type: TDataType) => void;
}
