// features/context-menu/lib/hooks/use-inverse-node.ts
import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { inverseTypes } from "../../config/constants";
import { TNodeInstructionsTypes } from "@/entities/editor";

export const useInverseNode = (
    nodeId: string,
    type: TNodeInstructionsTypes
) => {
    const { updateNodeData } = useReactFlow();

    const handleClick = useCallback(() => {
        updateNodeData(nodeId, { type: inverseTypes[type] });
    }, [nodeId, type, updateNodeData]);

    return handleClick;
};
