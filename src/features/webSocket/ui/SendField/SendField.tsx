import { Button, Input } from "@/shared/ui";
import { useState } from "react";
import { useWebSocketStore } from "../../model/useWebSocketStore";
import styles from "./styles.module.css";
type Props = {};

export const SendField = ({}: Props) => {
    const { sendMessage } = useWebSocketStore((state) => ({
        sendMessage: state.sendMessage,
    }));
    const [value, setValue] = useState("");
    const handleClick = () => {
        sendMessage(value);
        setValue("");
    };
    return (
        <div className={styles["controll-block"]}>
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
            <Button text={"отправить"} onClick={handleClick} />
        </div>
    );
};
