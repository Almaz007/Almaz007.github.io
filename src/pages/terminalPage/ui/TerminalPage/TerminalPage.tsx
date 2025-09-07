import { TerminalPanel } from "@/widgets/terminalPanel";
import { TerminalLogs } from "@/widgets/terminalLogs";
import { TerminalInputField } from "@/widgets/TerminalInputField";
import styles from "./styles.module.css";

export const TerminalPage = () => {
    return (
        <div className={styles["terminal"]}>
            <TerminalPanel />
            <TerminalLogs />
            <TerminalInputField />
        </div>
    );
};
