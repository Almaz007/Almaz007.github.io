import { ComponentType, useRef, type DragEvent } from "react";

import styles from "./styles.module.css";
import { TViewProps, TNodeInstructionsTypes } from "@/entities/editor";

interface Props {
    type: TNodeInstructionsTypes;
    viewData: TViewProps & { view: ComponentType<TViewProps> };
}

export const ListItem = ({ viewData, type }: Props) => {
    const dragImageRef = useRef(null);
    const { view: Item, name, ...props } = viewData;

    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer?.setData("application/reactflow", type);

        if (dragImageRef.current) {
            event.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
        }
    };

    return (
        <div
            className={styles["panel__item"]}
            draggable
            onDragStart={onDragStart}
        >
            <Item {...props} />
            <div className={styles["name"]}>{name}</div>
            <div
                className={styles["sidebar-item-drag-image"]}
                ref={dragImageRef}
            >
                <Item {...props} />
            </div>
        </div>
    );
};
