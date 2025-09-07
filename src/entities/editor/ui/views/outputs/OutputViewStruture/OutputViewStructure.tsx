import styles from "./styles.module.css";
import { TViewProps } from "@/entities/editor/model/types/view";

export const OutputViewStructure = ({
    width,
    height,
    text,
    icon,
}: TViewProps) => {
    return (
        <div
            className={styles["input"]}
            style={{ width: width, height: height }}
        >
            <div className={styles["text"]}>{text}</div>
            <div className={styles["img"]}>{icon}</div>
        </div>
    );
};
