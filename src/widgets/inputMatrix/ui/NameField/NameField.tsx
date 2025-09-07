import { TNodeData, useEditorStore } from "@/entities/editor";
import { Input } from "@/shared/ui";
import { Node } from "@xyflow/react";
import { useMemo } from "react";

type Props = {
    id: string;
    value: string;
};

export const NameField = ({ id, value }: Props) => {
    const [nodes, updateNodes] = useEditorStore((state) => [
        state.nodes,
        state.updateNodes,
    ]);

    const node = useMemo(() => nodes.find((node) => node.id === id), [nodes]);
    if (!node) return <div>узел не найден</div>;

    const handleChange = (value: string) => {
        const newNode = { ...node, data: { ...node?.data, name: value } };

        const newNodes: Node<TNodeData>[] = nodes.map((node) =>
            node.id === newNode.id ? newNode : node
        );
        updateNodes(newNodes);
    };
    return (
        <Input value={value} onChange={(e) => handleChange(e.target.value)} />
    );
};
