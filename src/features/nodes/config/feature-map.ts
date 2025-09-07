import { TNodeData, TNodeInstructionsTypes } from "@/entities/editor";
import { ComponentType, ReactNode } from "react";
import { ContextMenuFeature } from "../ui/ContextMenuFeatrue/ContextMenuFeature";
import { IncDecBtns } from "../ui/IncDecBtns/IncDecBtns";
import { OutputsCountsFourier } from "../ui/OutputsCountsFourier/OutputsCountsFourier";
import { Node, NodeProps } from "@xyflow/react";

type NodeFeatureComponent = ComponentType<{
    node: NodeProps<Node<TNodeData>>;
    children: ReactNode;
}>;

type FeatureMap = {
    [key in TNodeInstructionsTypes]?: NodeFeatureComponent[];
};

export const featureMap: FeatureMap = {
    analogInput: [ContextMenuFeature],
    discreteInput: [ContextMenuFeature],
    discreteOutput: [ContextMenuFeature],
    fourierInt: [ContextMenuFeature, OutputsCountsFourier],
    constInt: [ContextMenuFeature],
    xor: [ContextMenuFeature, IncDecBtns],
    and: [ContextMenuFeature, IncDecBtns],
    or: [ContextMenuFeature, IncDecBtns],
    nand: [ContextMenuFeature, IncDecBtns],
    nor: [ContextMenuFeature, IncDecBtns],
    multInt: [ContextMenuFeature, IncDecBtns],
    sumInt: [ContextMenuFeature, IncDecBtns],
    subInt: [ContextMenuFeature],
    timerInt: [ContextMenuFeature],
    equalsInt: [ContextMenuFeature],
    lessInt: [ContextMenuFeature],
    moreInt: [ContextMenuFeature],
    fifoByte: [ContextMenuFeature],
    fifoByteWithoutEn: [ContextMenuFeature],
    fifoWord: [ContextMenuFeature],
    fifoWordWithoutEn: [ContextMenuFeature],
};
