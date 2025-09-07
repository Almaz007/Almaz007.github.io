import { ComponentType } from "react";
import { TNodeData } from "../..";
import { TNodeInstructionsTypes } from "../nodeInstructions";
import { TDataType } from "@/shared/types";
import { TBaseNodeData } from "./editor";
import { TFifoNodeData } from "./editor";

export type TSetpointNodeDataWithNullOffset = TBaseNodeData & {
    setpointDataType: TDataType;
    setpointOffset: null;
};

export type TNodeDataWithNullOffset =
    | TBaseNodeData
    | TSetpointNodeDataWithNullOffset
    | TFifoNodeData;

export type TNodeConfigurations = Partial<
    Record<TNodeInstructionsTypes, TNodeDataWithNullOffset>
>;

export interface IBuisnessComponentProps {
    data: TNodeData;
}
export type TBuisnessComponents = Partial<
    Record<TNodeInstructionsTypes, ComponentType<IBuisnessComponentProps>>
>;
