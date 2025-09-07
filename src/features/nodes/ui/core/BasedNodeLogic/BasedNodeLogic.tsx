import { NodeViews, TNodeData } from "@/entities/editor";
import { Node, NodeProps, Position } from "@xyflow/react";
import styles from "./styles.module.css";
import { InputHandles } from "@/features/nodes/ui/core/InputHandles/InputHandles";
import { CustomHandle } from "@/features/nodes/ui/core/CustomHandle/CustomHandle";
import { applyFeatures } from "@/features/nodes/lib/utils/applyFeatures";
import { memo } from "react";

type Props = NodeProps<Node<TNodeData>>;

export const BasedNodeLogic = memo((node: Props) => {
    const { type, inputHandles, outputHandles } = node.data;

    const viewInfo = NodeViews[type];

    if (!viewInfo) {
        return null;
    }

    const { view: ViewElement, ...props } = viewInfo;

    const baseNode = (
        <div className={styles["row"]}>
            {!!Object.keys(inputHandles).length && (
                <InputHandles nodeId={node.id} inputHandles={inputHandles} />
            )}
            <ViewElement {...props} />

            {!!Object.keys(outputHandles).length &&
                Object.keys(outputHandles).map((key) => (
                    <CustomHandle
                        key={key}
                        id={`${node.id} ${key}`}
                        type={"source"}
                        position={Position.Right}
                        dataType={outputHandles[key].dataType}
                    />
                ))}
        </div>
    );
    const fourierNode = () => {
        const InputsLength = Object.keys(inputHandles).length;
        const inputHandleKey = Object.keys(inputHandles)[0];

        return (
            <div className={styles["row"]}>
                {!!InputsLength && (
                    <div className={styles["input"]}>
                        <CustomHandle
                            key={inputHandleKey}
                            id={`${node.id} ${inputHandleKey}`}
                            type={"target"}
                            position={Position.Left}
                            dataType={inputHandles[inputHandleKey].dataType}
                        />
                    </div>
                )}

                <ViewElement {...props} />

                {!!Object.keys(outputHandles).length && (
                    <div className={styles["outputs"]}>
                        {Array.from(
                            {
                                length: Math.ceil(
                                    Object.keys(outputHandles).length / 2
                                ),
                            },
                            (_, i) =>
                                Object.keys(outputHandles).slice(
                                    i * 2,
                                    i * 2 + 2
                                )
                        ).map((pair, pairIndex) => (
                            <div className={styles["wraps"]} key={pairIndex}>
                                {pair.map((key, indexInPair) => (
                                    <div
                                        key={key}
                                        className={styles["handle-wrap"]}
                                    >
                                        {indexInPair === 0 ? (
                                            <div className={styles["text"]}>
                                                Amp
                                            </div>
                                        ) : (
                                            <div className={styles["text"]}>
                                                Ph
                                            </div>
                                        )}
                                        <CustomHandle
                                            key={`${pairIndex}-${indexInPair}`}
                                            id={`${node.id} ${key}`}
                                            type={"source"}
                                            position={Position.Right}
                                            dataType={
                                                outputHandles[key].dataType
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };
    const resNode = type !== "fourierInt" ? baseNode : fourierNode();
    return applyFeatures(node, resNode);
});
