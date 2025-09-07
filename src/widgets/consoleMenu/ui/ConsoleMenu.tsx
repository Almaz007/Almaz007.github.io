import React, { useMemo } from "react";
import { useConsoleMenuLogic } from "../hooks/useConsoleMenuLogic";
import styles from "./styles.module.css";
import { Input } from "@/shared/ui";

export type MenuItem = {
    label: string;
    action?: () => void;
    children?: MenuItem[];
    disabled?: boolean;
};

export type Menu = {
    title: string;
    items: MenuItem[];
};

type Props = {
    menu?: Menu;
};

const DemoRootMenu: Menu = {
    title: "Главное меню",
    items: [
        {
            label: "Файлы",
            children: [
                { label: "Создать", action: () => console.log("Создать файл") },
                { label: "Открыть", action: () => console.log("Открыть файл") },
                { label: "Удалить", action: () => console.log("Удалить файл") },
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

export const ConsoleMenuCore: React.FC<Required<Props>> = ({ menu }) => {
    const {
        stack,
        currentMenu,
        selectedIndex,
        inputValue,
        setInputValue,
        setSelectedIndex,
        submitInput,
    } = useConsoleMenuLogic(menu);

    if (!currentMenu) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitInput(inputValue);
        setInputValue("");
    };

    return (
        <div className={styles["container"]}>
            <div className={styles.breadcrumbs}>
                {"> " + stack.map((m) => m.title).join(" / ")}
            </div>

            <div className={styles["items"]}>
                {currentMenu.items.map((item, idx) => {
                    const isActive = idx === selectedIndex;
                    return (
                        <div
                            key={idx}
                            className={[
                                styles["item"],
                                isActive ? styles["active"] : "",
                                item.disabled ? styles["disabled"] : "",
                            ].join(" ")}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                setSelectedIndex(idx);
                            }}
                        >
                            <span className={styles["index"]}>{idx + 1}.</span>
                            <span className={styles["label"]}>
                                {item.label}
                            </span>
                            {item.children && (
                                <span className={styles["arrow"]}>›</span>
                            )}
                        </div>
                    );
                })}
            </div>

            <form onSubmit={handleSubmit} className={styles["inputRow"]}>
                <span className={styles["prompt"]}>&gt;</span>

                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Введите номер пункта..."
                    aria-label="Выбор пункта по номеру"
                />
            </form>

            <div className={styles["help"]}>
                ↑↓ выбрать • Enter открыть/выполнить • Backspace/Esc назад •
                [цифра] быстрый выбор • введите номер и Enter
            </div>
        </div>
    );
};

export const ConsoleMenu: React.FC<Props> = ({ menu }) => {
    const root = useMemo(() => menu ?? DemoRootMenu, [menu]);
    return <ConsoleMenuCore menu={root} />;
};
