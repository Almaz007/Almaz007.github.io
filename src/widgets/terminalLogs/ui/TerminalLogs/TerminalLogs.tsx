import { useBleStore } from "@/shared/model";
import styles from "./styles.module.css";
import LogItem from "../logItem/LogItem";
import { shallow } from "zustand/shallow";

export const TerminalLogs = () => {
    const [logs] = useBleStore((state) => [state.logs], shallow);
    return (
        <div className={styles["logs"]}>
            {logs.map((log) => (
                <LogItem key={log.id} log={log} />
            ))}
        </div>
    );
};
