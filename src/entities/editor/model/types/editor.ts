import { TDataType } from "@/shared/types";
import {
    Edge,
    Node,
    NodeChange,
    OnConnect,
    OnEdgesChange,
} from "@xyflow/react";
import { TNodeInstructionsTypes } from "../nodeInstructions";

export type TInputHandle = Record<string, { dataType: TDataType }>;
export type TOutputHandle = Record<
    string,
    { dataType: TDataType; name?: string; oscillography?: boolean }
>;

export type TBaseNodeData = {
    type: TNodeInstructionsTypes;
    inputHandles: TInputHandle;
    outputHandles: TOutputHandle;
    name?: string;
};

export type TSetpointNodeData = TBaseNodeData & {
    setpointDataType: TDataType;
    setpointOffset: number;
};

export type TFifoNodeData = TBaseNodeData & {
    lengthMemory: number;
};

export type TNodeData = TBaseNodeData | TSetpointNodeData | TFifoNodeData;

export interface EditorState {
    nodes: Node<TNodeData>[];
    edges: Edge[];
    onNodesChange: (changes: NodeChange<Node<TNodeData>>[]) => void;
    onEdgesChange: OnEdgesChange<Edge>;
    addEdge: OnConnect;
    addNode: (newNode: Node<TNodeData>) => void;
    updateEdges: () => void;
    updateNodes: (newNodes: Node<TNodeData>[]) => void;
    setNodes: (newNodes: Node<TNodeData>[]) => void;
    setEdges: (newEdges: Edge[]) => void;
}
