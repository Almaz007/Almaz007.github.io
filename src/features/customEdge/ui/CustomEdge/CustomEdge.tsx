import {
    BaseEdge,
    Edge,
    EdgeLabelRenderer,
    EdgeProps,
    getSmoothStepPath,
    Position,
    useReactFlow,
    useStore,
} from "@xyflow/react";
import { markerTypes, colorsByTypes } from "@/entities/editor";
import { TNodeData } from "@/entities/editor";
import { Node } from "@xyflow/react";
import styles from "./styles.module.css";
import cn from "classnames";
import { Input } from "@/shared/ui";
import { ChangeEvent } from "react";
import { shallow } from "zustand/shallow";

export const CustomEdge = ({
    id,
    source,
    sourceHandleId,
    sourceX,
    sourceY,
    targetX,
    targetY,
    selected,
    sourcePosition = Position.Right,
    targetPosition = Position.Left,
}: EdgeProps) => {
    const { getEdge, setEdges, updateNodeData } = useReactFlow<
        Node<TNodeData>,
        Edge
    >();

    const node = useStore(
        (state) => state.nodeLookup.get(source) as Node<TNodeData> | undefined,
        shallow
    );
    const edge = getEdge(id);

    if (!node || !edge || !sourceHandleId) return null;

    const handleKey = sourceHandleId.split(" ")[1];
    const handleData = node.data.outputHandles[handleKey];

    if (!handleData) return null;

    const { dataType, oscillography, name } = handleData;

    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        borderRadius: 8,
        offset: 17,
    });

    const strokeColor = selected
        ? colorsByTypes[dataType]?.selectedClr
        : colorsByTypes[dataType]?.clr;

    const markerType = markerTypes[dataType];

    const deleteEdge = () => {
        setEdges((edges) => edges.filter((edgeIem) => edgeIem.id !== edge.id));
    };

    const handleOsc = () => {
        updateNodeData(node.id, {
            outputHandles: {
                ...node.data.outputHandles,
                [handleKey]: {
                    ...handleData,
                    oscillography: !oscillography,
                    name: "",
                },
            },
        });
    };

    const changeName = (event: ChangeEvent<HTMLInputElement>) => {
        updateNodeData(node.id, {
            outputHandles: {
                ...node.data.outputHandles,
                [handleKey]: {
                    ...handleData,
                    name: event.target.value ?? "",
                },
            },
        });
    };

    return (
        <>
            {/* SVG-маркеры */}
            <defs>
                <marker
                    id="circle"
                    viewBox="0 0 10 10"
                    refX={9}
                    refY={5}
                    markerWidth={8}
                    markerHeight={8}
                    orient="auto-start-reverse"
                >
                    <circle
                        cx="6"
                        cy="5"
                        r="3"
                        fill={colorsByTypes["int"]?.clr}
                    />
                </marker>

                <marker
                    id="arrow-closed"
                    viewBox="0 0 10 10"
                    refX={10}
                    refY={5}
                    markerWidth={8}
                    markerHeight={8}
                    orient="auto-start-reverse"
                >
                    <path
                        d="M 0 0 L 10 5 L 0 10 Z"
                        fill={colorsByTypes["float"]?.clr}
                    />
                </marker>
            </defs>

            {/* Линия ребра */}
            <BaseEdge
                id={id}
                path={edgePath}
                style={{
                    stroke: strokeColor,
                    strokeWidth: 3,
                }}
                markerEnd={markerType ? `url(#${markerType})` : undefined}
            />

            {/* Лейбл при выделении */}
            {selected && (
                <EdgeLabelRenderer>
                    <div
                        className={cn(
                            styles["button-edge__label"],
                            "nodrag",
                            "nopan"
                        )}
                        style={{
                            transform: `translate(-50%, -140%) translate(${labelX}px,${labelY}px)`,
                        }}
                    >
                        {oscillography && (
                            <Input
                                style={{
                                    width: "100%",
                                    padding: "6px",
                                    fontSize: "14px",
                                }}
                                placeholder="Название сигнала"
                                type="text"
                                value={name}
                                onChange={changeName}
                            />
                        )}
                        <button
                            className={styles["button-txt"]}
                            onClick={handleOsc}
                        >
                            {oscillography
                                ? "Разосцилографировать"
                                : "Осцилографировать"}
                        </button>
                        <button
                            className={cn(
                                styles["button-txt"],
                                styles["delete"]
                            )}
                            onClick={deleteEdge}
                        >
                            Удалить
                        </button>
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
};
