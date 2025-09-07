import { getSmoothStepPath } from "@xyflow/react";
import { ConnectionLineComponentProps } from "@xyflow/react";
import { TNodeData } from "@/entities/editor";
import { Node } from "@xyflow/react";
import { colorsByTypes } from "@/entities/editor";

export const ConnectionLine = ({
    fromX,
    fromY,
    toX,
    toY,
    fromPosition,
    fromHandle,
    toPosition,
    fromNode,
}: ConnectionLineComponentProps<Node<TNodeData>>) => {
    // const { fromNode, toNode } = useConnection<InternalNode<Node<TNodeData>>>();

    const [path] = getSmoothStepPath({
        sourceX: fromX,
        sourceY: fromY,
        targetX: toX,
        targetY: toY,
        offset: 16,
        sourcePosition: fromPosition,
        targetPosition: toPosition,
    });
    if (!fromNode || !fromHandle || !fromHandle.id) return null;

    const dataType =
        fromNode.data.outputHandles[fromHandle.id?.split(" ")[1]]?.dataType ||
        fromNode.data.inputHandles[fromHandle.id?.split(" ")[1]]?.dataType;

    if (!dataType) return null;

    return (
        <g>
            <path
                fill="none"
                stroke={colorsByTypes[dataType].clr}
                strokeWidth={2}
                d={path}
            />
            {/* <circle
                cx={toX}
                cy={toY}
                fill="#fff"
                r={4}
                stroke={typeColors[fromHandle.id].clr}
                strokeWidth={1.5}
            /> */}
        </g>
    );
};
