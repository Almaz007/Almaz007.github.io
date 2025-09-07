import { DndFile } from "@/widgets/dndFile";
import { SendField, useWebSocketStore } from "@/features/webSocket";
// import { ConsoleMenu, Menu } from "@/widgets/consoleMenu";
import { shallow } from "zustand/shallow";
import { ConsoleMenu, Menu } from "@/widgets/consoleMenu";
import styles from "./styles.module.css";

export const WebSocketClient = () => {
    const [status, error, messages, connect, disconnect] = useWebSocketStore(
        (state) => [
            state.status,
            state.error,
            state.messages,
            state.connect,
            state.disconnect,
        ],
        shallow
    );
    const DemoRootMenu: Menu = {
        title: "Главное меню",
        items: [
            {
                label: "Файлы",
                children: [
                    {
                        label: "Создать",
                        action: () => console.log("Создать файл"),
                    },
                    {
                        label: "Открыть",
                        action: () => console.log("Открыть файл"),
                    },
                    {
                        label: "Удалить",
                        action: () => console.log("Удалить файл"),
                    },
                ],
            },
            {
                label: "Настройки",
                children: [
                    { label: "Профиль", action: () => console.log("Профиль") },
                    { label: "Система", action: () => console.log("Система") },
                ],
            },
            { label: "Выход", action: () => console.log("Выход") },
        ],
    };
    return (
        <div>
            <h2>WebSocket</h2>
            <p>
                Status: {status} {error && `| Error: ${error}`}
            </p>

            <button onClick={() => connect("wss://int-rt.ru:3010")}>
                Подключить
            </button>
            <br />
            <button onClick={disconnect}>Отключить</button>

            <div
                style={{
                    height: "300px",
                    overflowY: "auto",
                    border: "1px solid blue",
                    padding: "10px",
                    marginTop: "10px",
                }}
            >
                {messages.map((msg, i) => (
                    <p key={i}>{msg}</p>
                ))}
            </div>
            <SendField />
            <div className={styles["row"]}>
                <ConsoleMenu menu={DemoRootMenu} />
                <DndFile />
            </div>
        </div>
    );
};
