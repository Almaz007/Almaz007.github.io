import {
    ReactFlow,
    ReactFlowProvider,
    Background,
    Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import styles from "./styles.module.css";
import { edgeTypes, nodeTypes, proOptions } from "../../config/constants";
import { ConnectionLine } from "@/features/connectionLine";
import { GraphPanel } from "../GraphPanel/GraphPanel";
import { SnackbarProvider } from "notistack";
import { useGraphEditor } from "../../hooks/useGraphEditor";
const GraphEditorContent = () => {
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onDragOver,
        onDrop,
        isValidConnection,
        onConnectEnd,
        addEdge,
    } = useGraphEditor();
    // const { addEdge } = useEdgeActions();
    console.log(edges);
    return (
        <div className={styles["graph-editor"]}>
            <ReactFlow
                deleteKeyCode={null}
                proOptions={proOptions}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={addEdge}
                onDragOver={onDragOver}
                onDrop={onDrop}
                connectionLineComponent={ConnectionLine}
                isValidConnection={isValidConnection}
                // onEdgesDelete={deleteEdge}
                onConnectEnd={onConnectEnd}
                fitView
            >
                <GraphPanel nodes={nodes} />
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export const GraphEditor = () => {
    return (
        <ReactFlowProvider>
            <SnackbarProvider maxSnack={3}>
                <GraphEditorContent />
            </SnackbarProvider>
        </ReactFlowProvider>
    );
};
