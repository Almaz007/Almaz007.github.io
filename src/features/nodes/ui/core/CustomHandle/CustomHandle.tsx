import { colorsByTypes } from "@/entities/editor";
import { TDataType } from "@/shared/types";
import { Position, Handle, useNodeConnections } from "@xyflow/react";
import styles from "./styles.module.css";

interface Props {
    id: string | number;
    type: "target" | "source";
    position: Position;
    dataType: TDataType | undefined;
}

export const CustomHandle = ({ id, type, position, dataType }: Props) => {
    const allConnections = useNodeConnections();

    const handleConnections = allConnections.filter(
        (connection) => type === "target" && connection.targetHandle === `${id}`
    );

    return (
        <Handle
            type={type}
            position={position}
            id={`${id}`}
            style={{
                backgroundColor: dataType && colorsByTypes[dataType].clr,
                transform:
                    position === Position.Left
                        ? "translate(-100%, -50%)"
                        : position === Position.Right
                        ? "translate(100%, -50%)"
                        : position === Position.Top
                        ? "translate(-50%, -100%)"
                        : "translate(-50%, 100%)",
            }}
            isConnectable={handleConnections.length < 1}
            className={styles["handle"]}
        />
    );
};
