import { TNodeData } from "@/entities/editor";
import styles from "./styles.module.css";
import cn from "classnames";
import {
    Node,
    NodeProps,
    useReactFlow,
    useUpdateNodeInternals,
} from "@xyflow/react";

type Props = {
    node: NodeProps<Node<TNodeData>>;
    children: React.ReactNode;
};

export const IncDecBtns = ({ node, children }: Props) => {
    const { id: nodeId, data } = node;

    const { updateNodeData, setEdges } = useReactFlow();
    const updateNodeInternals = useUpdateNodeInternals();

    const inputHandles = data.inputHandles || {};
    const inputKeys = Object.keys(inputHandles);
    const dataType = inputHandles[inputKeys[0]].dataType;

    const countRanges = { min: 2, max: 10 } as const;

    const handleInc = () => {
        const currentCount = inputKeys.length;
        if (currentCount >= countRanges.max) return;

        const newKey = `input-${currentCount + 1}`;
        const updatedHandles = {
            ...inputHandles,
            [newKey]: { dataType: dataType },
        };

        updateNodeData(nodeId, { inputHandles: updatedHandles });
        updateNodeInternals(nodeId);
    };

    const handleDec = () => {
        const currentCount = inputKeys.length;
        if (currentCount <= countRanges.min) return;

        const sortedKeys = Object.keys(inputHandles)
            .filter((k) => k.startsWith("input-"))
            .sort((a, b) => {
                const aNum = parseInt(a.replace("input-", ""), 10);
                const bNum = parseInt(b.replace("input-", ""), 10);
                return bNum - aNum; // убывание
            });

        const keyToRemove = sortedKeys[0]; // самый последний
        const { [keyToRemove]: _, ...rest } = inputHandles;
        setEdges((edges) =>
            edges.filter(
                (edge) => edge.targetHandle !== `${nodeId} ${keyToRemove}`
            )
        );
        updateNodeData(nodeId, { inputHandles: rest });
        updateNodeInternals(nodeId);
    };

    const isIncDisabled = inputKeys.length >= countRanges.max;
    const isDecDisabled = inputKeys.length <= countRanges.min;

    return (
        <div className={styles["inc-dec"]}>
            <button
                className={cn(styles["inc"], "nodrag", {
                    [styles["disabled"]]: isIncDisabled,
                })}
                onClick={handleInc}
                disabled={isIncDisabled}
            >
                +
            </button>
            {children}
            <button
                className={cn(styles["dec"], "nodrag", {
                    [styles["disabled"]]: isDecDisabled,
                })}
                onClick={handleDec}
                disabled={isDecDisabled}
            >
                —
            </button>
        </div>
    );
};
