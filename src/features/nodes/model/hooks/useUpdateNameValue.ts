import { TNodeData } from "@/entities/editor";
import { useReactFlow } from "@xyflow/react";
import { ChangeEvent } from "react";

export const useUpdateNameValue = (nodeId: string, data: TNodeData) => {
    const { updateNodeData } = useReactFlow();

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;
        updateNodeData(nodeId, { name: newName });
    };

    return { name: data.name, handleChangeName };
};
