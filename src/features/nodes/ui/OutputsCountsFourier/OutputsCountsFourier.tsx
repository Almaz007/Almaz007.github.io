import { TNodeData } from "@/entities/editor";
import styles from "./styles.module.css";
import cn from "classnames";
import {
    Node,
    NodeProps,
    useReactFlow,
    useUpdateNodeInternals,
} from "@xyflow/react";
import { getOffset } from "@/shared/model/ofsset";
import { enqueueSnackbar } from "notistack";

type Props = {
    node: NodeProps<Node<TNodeData>>;
    children: React.ReactNode;
};

export const OutputsCountsFourier = ({ node, children }: Props) => {
    const { id: nodeId, data } = node;
    const { updateNodeData, setEdges } = useReactFlow();

    const outputHandles = data.outputHandles || {};
    const outputKeys = Object.keys(outputHandles);

    const countRanges = { min: 2, max: 6 } as const;
    const updateNodeInternals = useUpdateNodeInternals();
    const handleInc = () => {
        const currentCount = outputKeys.length;
        const canAdd = countRanges.max - currentCount;
        const toAdd = Math.min(2, canAdd);

        if (toAdd > 0) {
            const updatedHandles = { ...outputHandles };
            for (let i = 1; i <= toAdd; i++) {
                const resultOffset = getOffset("int");
                if (!resultOffset) {
                    enqueueSnackbar("Не удалсоь выделить смещение типа int", {
                        variant: "error",
                    });
                    return;
                }

                const newKey = `out-${currentCount + i}`;
                updatedHandles[newKey] = {
                    dataType: "int",
                };
            }
            updateNodeData(nodeId, { outputHandles: updatedHandles });
            updateNodeInternals(nodeId);
        }
    };

    const handleDec = () => {
        const currentCount = outputKeys.length;
        const canRemove = currentCount - countRanges.min;
        const toRemove = Math.min(2, canRemove);

        if (toRemove > 0) {
            const updatedHandles = { ...outputHandles };

            // Сортируем ключи по числовому суффиксу по убыванию
            const sortedKeys = Object.keys(updatedHandles)
                .filter((key) => key.startsWith("out-"))
                .sort((a, b) => {
                    const aNum = parseInt(a.replace("out-", ""), 10);
                    const bNum = parseInt(b.replace("out-", ""), 10);
                    return bNum - aNum;
                });

            // Удаляем первые `toRemove` ключей из конца
            for (let i = 0; i < toRemove; i++) {
                const keyToRemove = sortedKeys[i];
                setEdges((edges) =>
                    edges.filter(
                        (edge) =>
                            edge.sourceHandle !== `${nodeId} ${keyToRemove}`
                    )
                );
                // addOffset("int", outputHandles[keyToRemove].resultOffset);
                delete updatedHandles[keyToRemove];
            }

            updateNodeData(nodeId, { outputHandles: updatedHandles });
            updateNodeInternals(nodeId);
        }
    };

    const isIncDisabled = outputKeys.length >= countRanges.max;
    const isDecDisabled = outputKeys.length <= countRanges.min;

    return (
        <div className={styles["inc-dec"]}>
            {children}
            <div className={styles["btns-row"]}>
                <button
                    className={cn(styles["btn"], styles["inc"], "nodrag", {
                        [styles["disabled"]]: isIncDisabled,
                    })}
                    onClick={handleInc}
                    disabled={isIncDisabled}
                >
                    +
                </button>
                <button
                    className={cn(styles["btn"], styles["dec"], "nodrag", {
                        [styles["disabled"]]: isDecDisabled,
                    })}
                    onClick={handleDec}
                    disabled={isDecDisabled}
                >
                    —
                </button>
            </div>
        </div>
    );
};
