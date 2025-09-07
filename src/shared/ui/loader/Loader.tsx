import { PulseLoader } from "react-spinners";
import styles from "./styles.module.css";

type Props = {
    color?: string;
    size?: number;
    speedMultiplier?: number;
};
export const Loader = ({
    color = "blue",
    size = 15,
    speedMultiplier = 1,
}: Props) => {
    return (
        <div className={styles["loader"]}>
            <PulseLoader
                color={color}
                size={size}
                speedMultiplier={speedMultiplier}
            />
        </div>
    );
};
