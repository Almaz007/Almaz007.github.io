import { EditorState } from "../types/editor";

export const editorSelector = (state: EditorState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    addEdge: state.addEdge,
});
