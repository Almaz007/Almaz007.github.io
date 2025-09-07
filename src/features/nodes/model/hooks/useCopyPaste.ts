import { useState, useCallback, useEffect, useRef } from "react";
import {
    Node,
    useKeyPress,
    useReactFlow,
    getConnectedEdges,
    KeyCode,
    Edge,
    XYPosition,
    useStore,
    NodeProps,
} from "@xyflow/react";

import { v4 as uuidv4 } from "uuid";
import { TNodeData } from "@/entities/editor";
import { enqueueSnackbar } from "notistack";
import { addSetpointOffset, getSetpointOffset } from "@/shared/model/setpoint";

type UseCopyPasteReturn = {
    cut: () => void;
    copy: () => void;
    paste: (position?: XYPosition) => Promise<void>;
    createDublicate: (node: NodeProps<Node<TNodeData>>) => void;
    bufferedNodes: Node<TNodeData>[];
    bufferedEdges: Edge[];
};

export function useCopyPaste(): UseCopyPasteReturn {
    const mousePosRef = useRef<XYPosition>({ x: 0, y: 0 });
    const rfDomNode = useStore((state) => state.domNode);
    const { getNodes, setNodes, getEdges, setEdges, screenToFlowPosition } =
        useReactFlow<Node<TNodeData>>();

    const [bufferedNodes, setBufferedNodes] = useState<Node<TNodeData>[]>([]);
    const [bufferedEdges, setBufferedEdges] = useState<Edge[]>([]);

    // Setup DOM event listeners
    useEffect(() => {
        if (!rfDomNode) return;

        const preventDefault = (e: Event) => e.preventDefault();
        const onMouseMove = (event: MouseEvent) => {
            mousePosRef.current = {
                x: event.clientX,
                y: event.clientY,
            };
        };

        const events: (keyof HTMLElementEventMap)[] = ["cut", "copy", "paste"];
        events.forEach((event) =>
            rfDomNode.addEventListener(event, preventDefault)
        );
        rfDomNode.addEventListener("mousemove", onMouseMove);

        return () => {
            events.forEach((event) =>
                rfDomNode.removeEventListener(event, preventDefault)
            );
            rfDomNode.removeEventListener("mousemove", onMouseMove);
        };
    }, [rfDomNode]);

    const getSelectedElements = useCallback(() => {
        const selectedNodes = getNodes().filter((node) => node.selected);
        const connectedEdges = getConnectedEdges(selectedNodes, getEdges());

        const selectedEdges = connectedEdges.filter((edge) => {
            const isExternalSource = !selectedNodes.some(
                (n) => n.id === edge.source
            );
            const isExternalTarget = !selectedNodes.some(
                (n) => n.id === edge.target
            );
            return !isExternalSource && !isExternalTarget;
        });

        return { selectedNodes, selectedEdges };
    }, [getNodes, getEdges]);

    const copy = useCallback(() => {
        const { selectedNodes, selectedEdges } = getSelectedElements();

        setBufferedNodes(selectedNodes);
        setBufferedEdges(selectedEdges);
    }, [getSelectedElements]);

    const saveNodeOffsets = (node: Node<TNodeData>) => {
        const data = node.data;
        if ("setpointDataType" in data) {
            addSetpointOffset(data.setpointDataType, data.setpointOffset);
        }

        // for (const handle of Object.values(data.outputHandles)) {
        //     addOffset(handle.dataType, handle.resultOffset);
        // }
    };

    const cut = useCallback(() => {
        try {
            const { selectedNodes, selectedEdges } = getSelectedElements();

            selectedNodes.forEach(saveNodeOffsets);

            setBufferedNodes(selectedNodes);
            setBufferedEdges(selectedEdges);

            setNodes((nodes) => nodes.filter((node) => !node.selected));
            setEdges((edges) =>
                edges.filter((edge) => !selectedEdges.includes(edge))
            );
        } catch (error) {
            enqueueSnackbar("Ошибка при вырезании", { variant: "error" });
            console.error("Paste error:", error);
        }
    }, [getSelectedElements, setNodes, setEdges]);

    const createNewNode = (
        node: Node<TNodeData>,
        position: XYPosition,
        minX: number,
        minY: number
    ): Node<TNodeData> => {
        const id = uuidv4();
        const x = position.x + (node.position.x - minX);
        const y = position.y + (node.position.y - minY);

        // const outputHandles: TOutputHandle = {};

        // for (const [key, handle] of Object.entries(node.data.outputHandles)) {
        //     const resultOffset = getOffset(handle.dataType);

        //     if (resultOffset === undefined)
        //         throw new Error("Ошибка при выделении памяти");

        //     outputHandles[key] = {
        //         dataType: handle.dataType,
        //     };
        // }
        if (!("setpointDataType" in node.data)) {
            return {
                ...node,
                id,
                position: { x, y },
                data: {
                    ...node.data,
                },
            };
        }
        const setpointOffset = getSetpointOffset(node.data.setpointDataType);
        if (setpointOffset === undefined)
            throw new Error("Ошибка при выделении памяти уставки");

        return {
            ...node,
            id,
            position: { x, y },
            data: {
                ...node.data,
                setpointOffset,
            },
        };
    };

    const createDublicate = (node: NodeProps<Node<TNodeData>>) => {
        try {
            const id = uuidv4();

            const x = node.positionAbsoluteX + 20;
            const height = (node.height ?? 140) + 10;
            const y = node.positionAbsoluteY + height;
            let newNode: Node<TNodeData>;

            if (!("setpointDataType" in node.data)) {
                newNode = {
                    ...node,
                    id,
                    position: { x, y },
                    data: {
                        ...node.data,
                    },
                };
                setNodes((nodes) => [
                    ...nodes.map((n) => ({ ...n, selected: false })),
                    newNode,
                ]);
                return;
            }

            const setpointOffset = getSetpointOffset(
                node.data.setpointDataType
            );
            if (setpointOffset === undefined)
                throw new Error("Ошибка при выделении памяти уставки");

            newNode = {
                ...node,
                id,
                position: { x, y },
                data: {
                    ...node.data,
                    setpointOffset,
                },
            };
            setNodes((nodes) => [
                ...nodes.map((n) => ({ ...n, selected: false })),
                newNode,
            ]);
        } catch (error) {
            enqueueSnackbar("Ошибка при копировании", { variant: "error" });
            console.error("Paste error:", error);
        }
    };

    const paste = useCallback(
        async (position = screenToFlowPosition(mousePosRef.current)) => {
            if (!bufferedNodes.length) return;

            try {
                const minX = Math.min(
                    ...bufferedNodes.map((node) => node.position.x)
                );
                const minY = Math.min(
                    ...bufferedNodes.map((node) => node.position.y)
                );

                const newNodes = await Promise.all(
                    bufferedNodes.map((node) =>
                        createNewNode(node, position, minX, minY)
                    )
                );

                const nodeIdMap = Object.fromEntries(
                    bufferedNodes.map((node, index) => [
                        node.id,
                        newNodes[index].id,
                    ])
                );

                const newEdges = bufferedEdges.map((edge) => ({
                    ...edge,
                    id: uuidv4(),
                    source: nodeIdMap[edge.source],
                    sourceHandle: `${nodeIdMap[edge.source]} ${
                        edge.sourceHandle?.split(" ")[1]
                    }`,
                    target: nodeIdMap[edge.target],
                    targetHandle: `${nodeIdMap[edge.target]} ${
                        edge.targetHandle?.split(" ")[1]
                    }`,
                }));

                setNodes((nodes) => [
                    ...nodes.map((n) => ({ ...n, selected: false })),
                    ...newNodes,
                ]);
                setEdges((edges) => [
                    ...edges.map((e) => ({ ...e, selected: false })),
                    ...newEdges,
                ]);
            } catch (error) {
                enqueueSnackbar("Ошибка при копировании", { variant: "error" });
                console.error("Paste error:", error);
            }
        },
        [bufferedNodes, bufferedEdges, screenToFlowPosition, setNodes, setEdges]
    );

    useShortcut(["Meta+x", "Control+x"], cut);
    useShortcut(["Meta+c", "Control+c"], copy);
    useShortcut(["Meta+v", "Control+v"], paste);

    return { cut, copy, paste, bufferedNodes, bufferedEdges, createDublicate };
}
function useShortcut(keyCode: KeyCode, callback: () => void): void {
    const [didRun, setDidRun] = useState(false);
    const shouldRun = useKeyPress(keyCode);

    useEffect(() => {
        if (shouldRun && !didRun) {
            callback();
            setDidRun(true);
        } else if (!shouldRun && didRun) {
            setDidRun(false);
        }
    }, [shouldRun, didRun, callback]);
}

export default useCopyPaste;
