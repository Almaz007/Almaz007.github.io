import { editorSelector, TNodeData, useEditorStore } from "@/entities/editor";
import { useDnd } from "@/features/dnd";
import {
    Connection,
    FinalConnectionState,
    getOutgoers,
    Node,
    Edge,
    useReactFlow,
} from "@xyflow/react";

import { useSnackbar } from "notistack";
import { shallow } from "zustand/shallow";

export const useGraphEditor = () => {
    const { nodes, edges, onNodesChange, onEdgesChange, addEdge } =
        useEditorStore(editorSelector, shallow);

    const { onDragOver, onDrop } = useDnd();
    const { getNodes, getEdges } = useReactFlow<Node<TNodeData>>();
    const { enqueueSnackbar } = useSnackbar();

    const isValidConnection: (connection: Edge | Connection) => boolean = (
        connection
    ) => {
        const nodes = getNodes();
        const edges = getEdges();

        const sourceId = connection.source ?? "";
        const targetId = connection.target ?? "";
        const sourceHandle = connection.sourceHandle;
        const targetHandle = connection.targetHandle;

        const source = nodes.find((node) => node.id === sourceId);
        const target = nodes.find((node) => node.id === targetId);

        if (!source || !target || !sourceHandle || !targetHandle) return false;

        const handleSourceDataType =
            source.data.outputHandles[sourceHandle?.split(" ")[1]]?.dataType ||
            source.data.inputHandles[sourceHandle?.split(" ")[1]]?.dataType;
        const handleTargetDataType =
            target.data.inputHandles[targetHandle?.split(" ")[1]]?.dataType ||
            target.data.outputHandles[targetHandle?.split(" ")[1]]?.dataType;

        if (handleSourceDataType !== handleTargetDataType) return false;

        const hasCycle = (node: Node, visited = new Set<string>()) => {
            if (visited.has(node.id)) return false;
            visited.add(node.id);

            for (const outgoer of getOutgoers(node, nodes, edges)) {
                if (outgoer.id === sourceId) return true;
                if (hasCycle(outgoer, visited)) return true;
            }

            return false;
        };

        if (sourceId === targetId) return false;

        return !hasCycle(target);
    };

    type CustomNodeData = {
        inputHandles?: Record<string, { dataType: string }>;
        outputHandles?: Record<string, { dataType: string }>;
    };

    const onConnectEnd = (
        _: MouseEvent | TouchEvent,
        connectionState: FinalConnectionState
    ) => {
        const { fromNode, fromHandle, toNode, toHandle, isValid } =
            connectionState;

        const castNodeData = (node: typeof fromNode): CustomNodeData =>
            node?.data as CustomNodeData;

        if (!fromNode || !toNode || !fromHandle?.id || !toHandle?.id) return;

        const sourceHandleId = fromHandle.id.split(" ")[1];
        const targetHandleId = toHandle.id.split(" ")[1];

        const fromData = castNodeData(fromNode);
        const toData = castNodeData(toNode);

        const sourceType =
            fromData.outputHandles?.[sourceHandleId]?.dataType ??
            fromData.inputHandles?.[sourceHandleId]?.dataType;

        const targetType =
            toData.inputHandles?.[targetHandleId]?.dataType ??
            toData.outputHandles?.[targetHandleId]?.dataType;

        if (sourceType !== targetType && isValid === false) {
            enqueueSnackbar("Нерроектное соединение", { variant: "error" });
        }
    };

    return {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        addEdge,
        onDragOver,
        onDrop,
        isValidConnection,
        onConnectEnd,
    };
};
