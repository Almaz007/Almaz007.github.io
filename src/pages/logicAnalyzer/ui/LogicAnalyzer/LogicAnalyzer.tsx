import { SignalTap, useAnalyzerStore } from "@/entities/analyzer";

import { shallow } from "zustand/shallow";
import styles from "./styles.module.css";
import { useMemo } from "react";
type Props = {};
export const LogicnAnalyzer = ({}: Props) => {
    const [oscillographicOffsets] = useAnalyzerStore(
        (state) => [state.oscillographicOffsets, state.toggleSend],
        shallow
    );

    // const signals = useMemo(() => generateRandomSignals(10, 200), []);
    const offsetSignals = useMemo(() => {
        return Object.entries(oscillographicOffsets).map(
            ([offset, offsetData]) => ({
                offset: Number(offset),
                name: offsetData.name,
                times: offsetData.timePoints,
                values: offsetData.values,
                dataType: offsetData.dataType,
            })
        );
    }, [oscillographicOffsets]);

    return (
        <div
            className={styles["offset-rows"]}
            style={{
                overflowX: "auto",
                maxWidth: "100%",
                padding: 6,
            }}
        >
            {offsetSignals.length !== 0 && (
                <SignalTap signals={offsetSignals} />
            )}
            {offsetSignals.length === 0 && "Нет осцилографированных данных"}
        </div>
    );
};
