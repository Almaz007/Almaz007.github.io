import { TViewProps } from "@/entities/editor/model/types/view";
import styles from "./styles.module.css";
import cn from "classnames";

export const FifoViewStructure = ({ width, height, withoutEn }: TViewProps) => {
    return (
        <div
            className={cn(styles["fifo"])}
            style={{ width: width, height: height }}
        >
            <div className={styles["column-1"]}>
                <div className={styles["port"]}>D</div>
                {!withoutEn && <div className={styles["port"]}>EN</div>}
            </div>
            <div className={styles["column-2"]}>
                <div className={styles["text"]}>FIFO</div>
            </div>
        </div>
    );
};
