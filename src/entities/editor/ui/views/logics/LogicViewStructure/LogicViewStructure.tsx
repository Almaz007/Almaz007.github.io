import { TViewProps } from "@/entities/editor/model/types/view";
import styles from "./styles.module.css";
import cn from "classnames";

export const LogicViewStructure = ({
    width,
    height,
    inverse,
    text,
}: TViewProps) => {
    return (
        <div
            className={cn(styles["logic"], { [styles["inverse"]]: inverse })}
            style={{ width: width, height: height }}
        >
            <div className={styles["text"]}>{text}</div>
        </div>
    );
};
