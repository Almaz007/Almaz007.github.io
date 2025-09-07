import { templates } from "../config/templates";
import { useEditorStore } from "@/entities/editor";
import { shallow } from "zustand/shallow";
import { getKeysByObj } from "@/shared/helpers";
import { generateNode } from "@/features/dnd";
import { Node } from "@xyflow/react";
import { TNodeData } from "@/entities/editor";

export const useTemplates = () => {
    const [nodes, setNodes] = useEditorStore(
        (state) => [state.nodes, state.setNodes],
        shallow
    );

    type TKeys = keyof typeof templates;
    const templatesKeys = getKeysByObj(templates);

    const addNodeByTemplate = (template: TKeys) => {
        const newNodesByTemplate = templates[template];

        const newNodes = newNodesByTemplate.reduce((acc, template) => {
            const newNode = generateNode(template.type, template.position);
            if (!newNode) return acc;
            acc.push(newNode);
            return acc;
        }, [] as Node<TNodeData>[]);

        setNodes([...nodes, ...newNodes]);
    };

    return { templatesKeys, addNodeByTemplate };
};
