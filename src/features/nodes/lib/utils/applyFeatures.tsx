import { ReactNode } from "react";
import { TNodeData } from "@/entities/editor";
import { featureMap } from "../../config/feature-map";
import { Node, NodeProps } from "@xyflow/react";

export const applyFeatures = (
    node: NodeProps<Node<TNodeData>>,
    children: ReactNode
) => {
    const features = featureMap[node.data.type] || [];

    return features.reduce((acc, Feature, index) => {
        return (
            <Feature node={node} key={`feature-${index}`}>
                {acc}
            </Feature>
        );
    }, children);
};
