import styles from "./styles.module.css";
import { TViewProps } from "@/entities/editor/model/types/view";

export const InputViewStructure = ({
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
            {icon && <div className={styles["img"]}>{icon}</div>}
            <div className={styles["text"]}>{text}</div>
        </div>
    );
};
