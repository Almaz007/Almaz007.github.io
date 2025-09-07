import { IoIosArrowDown } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import cn from "classnames";
import styles from "./styles.module.css";

interface Props {
    name: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export const DropDownList = ({
    name,
    children,
    defaultOpen = false,
}: Props) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            // Получаем высоту содержимого при монтировании и при изменении
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [children]); // Зависимость от children на случай их изменения

    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className={styles.container}>
            <button
                className={styles.header}
                onClick={toggleOpen}
                aria-expanded={isOpen}
            >
                <span className={styles.title}>{name}</span>
                <IoIosArrowDown
                    className={cn(styles.arrow, { [styles.rotated]: isOpen })}
                />
            </button>

            <div
                ref={contentRef}
                className={styles.content}
                style={{
                    height: isOpen ? `${contentHeight}px` : "0px",
                }}
                aria-hidden={!isOpen}
            >
                <div className={styles.innerContent}>{children}</div>
            </div>
        </div>
    );
};
