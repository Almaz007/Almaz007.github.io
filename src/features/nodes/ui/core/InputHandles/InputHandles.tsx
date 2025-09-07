import { Position } from "@xyflow/react";
import { CustomHandle } from "../CustomHandle/CustomHandle";
import styles from "./styles.module.css";
import { TInputHandle } from "@/entities/editor";

interface Props {
    nodeId: string;
    inputHandles: TInputHandle;
}

export const InputHandles = ({ nodeId, inputHandles }: Props) => {
    return (
        <div className={styles["handles-column"]}>
            {Object.keys(inputHandles).map((key) => (
                <div className={styles["handle-wrap"]} key={key}>
                    <CustomHandle
                        id={`${nodeId} ${key}`}
                        type={"target"}
                        position={Position.Left}
                        dataType={inputHandles[key].dataType}
                    />
                </div>
            ))}
        </div>
    );
};
