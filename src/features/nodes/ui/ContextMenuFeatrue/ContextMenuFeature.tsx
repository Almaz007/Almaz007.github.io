import { TNodeData } from "@/entities/editor";
import { useActionFactory } from "../../model/hooks/useActionFactory";
import { ContextMenu } from "../ContextMenu/ContextMenu";
import { useState } from "react";
import { Node, NodeProps } from "@xyflow/react";

export const ContextMenuFeature = ({
    node,
    children,
}: {
    node: NodeProps<Node<TNodeData>>;
    children: React.ReactNode;
}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const { actions } = useActionFactory(node);

    return (
        <div
            style={{
                position: "relative",
            }}
            onDoubleClick={() => setVisible((prev) => !prev)}
        >
            {children}
            <ContextMenu
                actions={actions}
                visible={visible}
                setVisible={setVisible}
            />
        </div>
    );
};
