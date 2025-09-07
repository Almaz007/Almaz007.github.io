import {
    MdOutlineBluetoothConnected,
    MdOutlineBluetoothDisabled,
} from "react-icons/md";
import { AiOutlineClear } from "react-icons/ai";
import styles from "./styles.module.css";
import { useBleStore } from "@/shared/model";
import cn from "classnames";
import { shallow } from "zustand/shallow";
import { useDisconnectBle } from "@/features/disconnectBle";

type Props = {};

export const TerminalPanel = ({}: Props) => {
    const [clearLogs, connect] = useBleStore(
        (state) => [state.clearLogs, state.connect],
        shallow
    );

    const { disconnect } = useDisconnectBle();

    return (
        <div className={styles["terminal-panel"]}>
            <div className={styles["btn"]}>
                <AiOutlineClear
                    onClick={clearLogs}
                    className={cn(styles["button"], styles["clear"])}
                />
            </div>
            <div className={styles["btn"]}>
                <MdOutlineBluetoothConnected
                    onClick={() => connect()}
                    className={cn(styles["button"], styles["connect"])}
                    data-title="Подключение"
                />
            </div>
            <div className={styles["btn"]}>
                <MdOutlineBluetoothDisabled
                    onClick={() => disconnect()}
                    className={cn(styles["button"], styles["disconnect"])}
                    data-title="Отключение"
                />
            </div>
        </div>
    );
};
