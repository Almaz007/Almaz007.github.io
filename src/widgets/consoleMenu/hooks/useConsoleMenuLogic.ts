// ---------- useConsoleMenuLogic.ts ----------
import { useState, useEffect } from "react";
import { Menu } from "../ui/ConsoleMenu";

export function useConsoleMenuLogic(rootMenu: Menu) {
    const [stack, setStack] = useState<Menu[]>([rootMenu]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [inputValue, setInputValue] = useState("");

    const currentMenu = stack[stack.length - 1];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                document.activeElement &&
                (document.activeElement as HTMLElement).tagName === "INPUT"
            )
                return;

            const len = currentMenu.items.length;
            if (len === 0) return;

            if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : len - 1));
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev < len - 1 ? prev + 1 : 0));
            } else if (e.key === "Home") {
                e.preventDefault();
                setSelectedIndex(0);
            } else if (e.key === "End") {
                e.preventDefault();
                setSelectedIndex(len - 1);
            } else if (e.key === "Enter") {
                e.preventDefault();
                const item = currentMenu.items[selectedIndex];
                if (!item || item.disabled) return;
                if (item.children) {
                    setStack((s) => [
                        ...s,
                        { title: item.label, items: item.children! },
                    ]);
                    setSelectedIndex(0);
                } else if (item.action) {
                    item.action();
                }
            } else if (e.key === "Backspace" || e.key === "Escape") {
                e.preventDefault();
                setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
                setSelectedIndex(0);
            } else if (/^[0-9]$/.test(e.key)) {
                2;
                const num = parseInt(e.key, 10) - 1;
                if (num >= 0 && num < len) setSelectedIndex(num);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentMenu, selectedIndex]);

    const selectByNumber = (n: number) => {
        const idx = n - 1;
        if (idx >= 0 && idx < currentMenu.items.length) {
            setSelectedIndex(idx);
            const item = currentMenu.items[idx];
            if (!item || item.disabled) return;
            if (item.children) {
                setStack((s) => [
                    ...s,
                    { title: item.label, items: item.children! },
                ]);
                setSelectedIndex(0);
            } else if (item.action) {
                item.action();
            }
        }
    };

    const submitInput = (value: string) => {
        const num = parseInt(value, 10);
        if (!isNaN(num)) selectByNumber(num);
    };

    return {
        stack,
        currentMenu,
        selectedIndex,
        inputValue,
        setInputValue,
        setSelectedIndex,
        submitInput,
    } as const;
}
