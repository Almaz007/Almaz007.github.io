import cn from "classnames";

import styles from "./styles.module.css";
import { TLog } from "@/shared/types";

type Props = {
    log: TLog;
};

const LogItem = ({ log }: Props) => {
    const { message, type } = log;
    return (
        <div
            className={cn(styles["log-text"], {
                [styles[type]]: !!type,
            })}
        >
            {message}
        </div>
    );
};

export default LogItem;
