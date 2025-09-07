import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { shallow } from "zustand/shallow";
import { DragEvent } from "react";

import { useEditorStore } from "@/entities/editor";
import { TNodeInstructionsTypes } from "@/entities/editor";
import { generateNode } from "../helpers/generateNode";

export const useDnd = () => {
    const addNode = useEditorStore((state) => state.addNode, shallow);
    const { screenToFlowPosition } = useReactFlow();

    const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const type = event.dataTransfer.getData("application/reactflow");

        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });
        const newNode = generateNode(type as TNodeInstructionsTypes, position);
        if (!newNode) return;
        addNode(newNode);
    };

    return { onDragOver, onDrop };
};
