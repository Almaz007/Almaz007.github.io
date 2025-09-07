import { TDataType } from "@/shared/types";

export interface ISetpoints {
    setpointsValues: number[];
    setpointOffsets: Record<TDataType, number[]>;
    setSetpoints: (newSetpointsValues: number[]) => void;
    setSetpointOffsets: (setpointOffsets: number[], type: TDataType) => void;
}

export type TInputValue = {
    id: number;
    value: string;
};
