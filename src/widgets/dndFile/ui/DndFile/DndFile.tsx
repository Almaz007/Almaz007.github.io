import { useState, DragEvent, FormEvent, ChangeEvent } from "react";

import styles from "./styles.module.css";
import cn from "classnames";
import { useWebSocketStore } from "@/features/webSocket";

export const DndFile = () => {
    const sendFile = useWebSocketStore((state) => state.sendFile);

    const [files, setFiles] = useState<File[]>([]);
    const [dragActive, setDragActive] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFiles([e.target.files[0]]);
        }
    };

    const handleReset = () => {
        setFiles([]);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!files || files.length === 0) return;
        const buff = await files[0].arrayBuffer();
        const newArr = new Uint8Array(buff);

        sendFile(newArr);
    };

    const handleDrag = function (e: DragEvent<HTMLFormElement>) {
        e.preventDefault();
        setDragActive(true);
    };

    const handleLive = function (e: DragEvent<HTMLFormElement>) {
        e.preventDefault();
        setDragActive(false);
    };

    const handleDrop = function (e: DragEvent<HTMLFormElement>) {
        e.preventDefault();
        setDragActive(false);

        if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
            setFiles([e.dataTransfer.files[0]]);
        }
    };

    return (
        <div
            className={cn(styles["wrapper"], {
                [styles["drag"]]: dragActive,
            })}
        >
            <form
                className={cn(styles["form"])}
                onReset={handleReset}
                onSubmit={handleSubmit}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleLive}
                onDrop={handleDrop}
            >
                <h2 className={styles["action-title"]}>
                    Перетащите файлы сюда
                </h2>
                <p>или</p>
                <label className={styles["label"]}>
                    <span className={styles["download-label"]}>
                        Загрузите файл
                    </span>
                    <input
                        className={styles["input"]}
                        type="file"
                        multiple={false}
                        onChange={handleChange}
                    />
                </label>
                {files.length > 0 && (
                    <div className={styles["info"]}>
                        <ul className={styles["file-list"]}>
                            <li>{files[0].name}</li>
                        </ul>
                        <div className={styles["btns"]}>
                            <button
                                className={styles["button-reset"]}
                                type="reset"
                            >
                                Отменить
                            </button>
                            <button
                                className={styles["button-submit"]}
                                type="submit"
                            >
                                Отправить
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};
