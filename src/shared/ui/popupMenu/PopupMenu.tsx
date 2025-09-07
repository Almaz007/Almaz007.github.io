import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";

import { Button } from "../button/Button";
import styles from "./styles.module.css";

interface Props {
    text: string;
    children: React.ReactNode;
    position: "left" | "center" | "right";
}

export const PopupMenu = ({ text, children, position }: Props) => {
    const [visible, setVisible] = useState<boolean>(false);
    const popupRef = useRef<HTMLDivElement>(null); // Явно указываем тип для ref

    useEffect(() => {
        const handleClickOutside = (event: globalThis.MouseEvent) => {
            // Используем globalThis.MouseEvent
            if (
                popupRef.current &&
                event.target instanceof Node && // Безопасная проверка типа
                !popupRef.current.contains(event.target)
            ) {
                setVisible(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Предотвращаем всплытие, чтобы клик по кнопке не триггерил handleClickOutside
        setVisible((prev) => !prev);
    };

    return (
        <div className={styles["popup"]} ref={popupRef}>
            <Button text={text} type="button" onClick={handleButtonClick} />
            <div
                className={cn(styles["popup-content"], styles[position], {
                    [styles["visible"]]: visible,
                })}
            >
                <div className={styles["popup__label"]}>{text}</div>
                <div>{children}</div>
            </div>
        </div>
    );
};
