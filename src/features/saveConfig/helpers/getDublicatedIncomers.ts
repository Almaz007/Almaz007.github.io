import { TNodeData } from "@/entities/editor";
import { Node, Edge, getIncomers } from "@xyflow/react";

export function getDuplicatedIncomers(
    node: Node<TNodeData>,
    nodes: Node<TNodeData>[],
    edges: Edge[]
) {
    const incomers = getIncomers(node, nodes, edges);
    // Подсчитываем количество входящих соединений
    const edgeCounts = edges.reduce((acc, edge) => {
        if (edge.target === node.id) {
            acc[edge.source] = (acc[edge.source] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    // Дублируем узлы в соответствии с количеством входящих соединений
    return incomers.flatMap((incomer) =>
        Array(edgeCounts[incomer.id]).fill(incomer)
    );
}
