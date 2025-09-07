export type TDataType = "int" | "float" | "bool" | "analog";
export interface IOffsetData {
    offsetsByTypes: Record<TDataType, number[]>;
    setOffsets: (offsets: number[], type: TDataType) => void;
}
