// features/context-menu/ui/ContextMenu.tsx
import { useRef, useEffect, memo } from "react";
import styles from "./styles.module.css";
import { TMenuAction } from "../../model/types";
import { NodeToolbar } from "@xyflow/react";

interface Props {
    actions: TMenuAction[];
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export const ContextMenu = memo(({ actions, visible, setVisible }: Props) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setVisible(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <NodeToolbar isVisible={visible}>
            <div ref={menuRef} className={styles["context-menu-block"]}>
                {actions.map((action, index) => (
                    <div key={index} className={styles["menu-item"]}>
                        {action.element}
                    </div>
                ))}
            </div>
        </NodeToolbar>
    );
});
