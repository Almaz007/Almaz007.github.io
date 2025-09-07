import React from "react";
import styles from "./styles.module.css";

type Props<T> = {
    renderHead: () => React.ReactNode;
    renderRow: (item: T) => React.ReactNode;
    rowItems: T[];
    getRowKey?: (item: T) => React.Key;
    maxWidth?: number;
} & React.HTMLAttributes<HTMLTableElement>;

export function Table<T>({
    renderHead,
    renderRow,
    rowItems = [],
    getRowKey,
    maxWidth,
    ...props
}: Props<T>) {
    return (
        <>
            <div
                className={styles["tableWrapper"]}
                style={{ maxWidth: maxWidth ? `${maxWidth}px` : "100%" }}
            >
                <table className={styles["table"]} {...props}>
                    <thead>
                        <tr>{renderHead()}</tr>
                    </thead>
                    <tbody>
                        {!!rowItems.length &&
                            rowItems.map((row, index) => (
                                <tr key={getRowKey?.(row) ?? index}>
                                    {renderRow(row)}
                                </tr>
                            ))}
                    </tbody>
                </table>
                {!rowItems.length && (
                    <p style={{ padding: "10px" }}>Нету данных</p>
                )}
            </div>
        </>
    );
}
