import { TNodeData } from "@/entities/editor";
import { addSetpointOffset } from "@/shared/model/setpoint";
import { useReactFlow, Node, Edge } from "@xyflow/react";

export const useDeleteNode = () => {
    const { setNodes, setEdges } = useReactFlow<Node<TNodeData>, Edge>();

    const handleDelete = (id: string, data: TNodeData) => {
        if ("setpointOffset" in data && data.setpointOffset !== undefined) {
            addSetpointOffset(data.setpointDataType, data.setpointOffset);
        }
        // for (const handle of Object.values(data.outputHandles)) {
        //     addOffset(handle.dataType, handle.resultOffset);
        // }

        // Удалить узел и связи
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        setEdges((edges) =>
            edges.filter((edge) => edge.target !== id && edge.source !== id)
        );
    };

    return { handleDelete };
};
