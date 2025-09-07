import { TViewProps } from "@/entities/editor/model/types/view";
import styles from "./styles.module.css";

export const AlgebraicViewStructure = ({ width, height, text }: TViewProps) => {
    return (
        <div
            className={styles["algebraic"]}
            style={{ width: width, height: height }}
        >
            <div className={styles["text"]}>{text}</div>
        </div>
    );
};
