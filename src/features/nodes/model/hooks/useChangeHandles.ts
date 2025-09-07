// features/context-menu/lib/hooks/use-change-handles.ts
import { useCallback } from "react";
import { useReactFlow, useUpdateNodeInternals } from "@xyflow/react";
import { generateHandles } from "../../lib/utils/genereteHandles";

export const useChangeHandles = (nodeId: string) => {
    const { updateNodeData, getEdges, setEdges, getNode } = useReactFlow();
    const updateNodeInternals = useUpdateNodeInternals();

    const items = [...new Array(10)].reduce((acc, _, index) => {
        acc.push({ value: index + 1 });
        return acc;
    }, []);

    const changeHandles = useCallback(
        (count: number | string) => {
            updateNodeData(nodeId, { inputHandlesCount: count });
            updateNodeInternals(nodeId);

            const edges = getEdges();
            const validTargetHandles = Object.keys(generateHandles(+count)).map(
                (key) => `${nodeId} ${key}`
            );

            const newEdges = edges.filter(
                (edge) =>
                    edge.target !== nodeId ||
                    (edge.targetHandle &&
                        validTargetHandles.includes(edge.targetHandle))
            );

            setEdges(newEdges);
        },
        [
            nodeId,
            updateNodeData,
            updateNodeInternals,
            getEdges,
            setEdges,
            getNode,
        ]
    );

    return { changeHandles, items };
};
