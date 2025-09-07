import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import { createWithEqualityFn } from "zustand/traditional";
import { EditorState } from "../types/editor";
import { v4 as uuidv4 } from "uuid";

export const useEditorStore = createWithEqualityFn<EditorState>((set, get) => ({
    nodes: [],
    edges: [],
    onNodesChange(changes) {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange(changes) {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    addEdge(data) {
        const id = uuidv4();
        const edge = {
            id,
            ...data,
            type: "custom-edge",
            animated: false,
        };
        set({ edges: [edge, ...get().edges] });
    },

    addNode(newNode) {
        const { nodes } = get();
        const sortedNodes = [...nodes, newNode];
        set({ nodes: [...sortedNodes] });
    },

    updateEdges() {
        set({ edges: [...get().edges] });
    },
    updateNodes(newNodes) {
        set({ nodes: [...newNodes] });
    },
    setNodes(newNodes) {
        set({ nodes: [...newNodes] });
    },
    setEdges(newEdges) {
        set({ edges: [...newEdges] });
    },
}));
