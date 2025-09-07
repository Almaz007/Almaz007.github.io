import { Input } from "@/shared/ui";
import styles from "./styles.module.css";
import { VscSend } from "react-icons/vsc";
import { useBleStore } from "@/shared/model";
import { shallow } from "zustand/shallow";

import { KeyboardEvent, useState } from "react";
type Props = {};
export const TerminalInputField = ({}: Props) => {
    const [value, setValue] = useState("");

    const [send] = useBleStore((state) => [state.send], shallow);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            send(value);
            setValue("");
        }
    };

    const handleClick = () => {
        send(value);
        setValue("");
    };

    return (
        <div className={styles["send-input"]}>
            <Input
                className={styles["send-input"]}
                onKeyDown={handleKeyDown}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <div className={styles["send-btn"]} onClick={handleClick}>
                <VscSend />
            </div>
        </div>
    );
};
