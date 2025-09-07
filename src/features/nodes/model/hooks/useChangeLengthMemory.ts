import { TNodeData } from "@/entities/editor";
import { useReactFlow } from "@xyflow/react";
import { ChangeEvent } from "react";

export const useChangeLengthMemory = (nodeId: string, data: TNodeData) => {
    if (!("lengthMemory" in data)) return null;
    const { updateNodeData } = useReactFlow();

    const handleChangeLengthMemory = (event: ChangeEvent<HTMLInputElement>) => {
        const newLengthMemory = event.target.value;
        updateNodeData(nodeId, { lengthMemory: +newLengthMemory });
    };

    return { lengthMemory: data.lengthMemory, handleChangeLengthMemory };
};
