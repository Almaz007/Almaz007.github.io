import { TNodeData } from "@/entities/editor";
import { useChangeHandles } from "./hooks/useChangeHandles";
import { useInverseNode } from "./hooks/useInverseNode";
import {
    useUpdateFourierValue,
    useUpdateSetpointValue,
} from "@/shared/model/setpoint";
import { useUpdateNameValue } from "./hooks/useUpdateNameValue";
import { useDeleteNode } from "./hooks/useDeleteNode";
import useCopyPaste from "./hooks/useCopyPaste";
import { Node, NodeProps } from "@xyflow/react";
import { useChangeLengthMemory } from "./hooks/useChangeLengthMemory";

export type TMenuAction = {
    key: string;
    label: string;
    element: React.ReactNode;
};

export type ActionDependencies = {
    useChangeHandles?: typeof useChangeHandles;
    useInverseNode?: typeof useInverseNode;
    useUpdateSetpointValue?: typeof useUpdateSetpointValue;
    useUpdateNameValue?: typeof useUpdateNameValue;
    useDeleteNode?: typeof useDeleteNode;
    useUpdateFourierValue?: typeof useUpdateFourierValue;
    useCopyPaste?: typeof useCopyPaste;
    useChangeLengthMemory?: typeof useChangeLengthMemory;
};

export type ActionFactory = {
    key: string;
    label: string;
    dependencies: (keyof ActionDependencies)[];
    createElement: (params: {
        node: NodeProps<Node<TNodeData>>;
        dependencies: ActionDependencies;
    }) => React.ReactNode;
};
