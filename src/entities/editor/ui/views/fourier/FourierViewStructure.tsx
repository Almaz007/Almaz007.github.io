import { TViewProps } from "@/entities/editor/model/types/view";
import styles from "./styles.module.css";
import cn from "classnames";

export const FourierViewStructure = ({ width, height }: TViewProps) => {
    return (
        <div
            className={cn(styles["fourier"])}
            style={{ width: width, height: height }}
        >
            <div className={styles["text"]}>F</div>
        </div>
    );
};
