import { useOscilogramStore } from "@/entities/oscilogram/indes";
import styles from "./styles.module.css";
import { Button } from "@/shared/ui";
import { shallow } from "zustand/shallow";
import { UplotChart } from "@/features/uplotChart";
import ChatInfo from "../ChartInfo/ChartInfo";

export const ChartList = () => {
    const [chartsData, chartNotificationStart, chartNotificationStop] =
        useOscilogramStore(
            (state) => [
                state.chartsData,
                state.chartNotificationStart,
                state.chartNotificationStop,
            ],
            shallow
        );
    console.log(chartsData);
    return (
        <div>
            <div className={styles["btn-rows"]}>
                <Button text="Старт" onClick={() => chartNotificationStart()} />
                <Button text="Пауза" onClick={() => chartNotificationStop()} />
            </div>

            {chartsData.length === 0 && (
                <div className={styles["empty-data-msg"]}>
                    Нету данных для графика
                </div>
            )}

            {chartsData.map((chart, index) => {
                return (
                    <div className={styles["chart-row"]} key={index}>
                        <ChatInfo data={chart} />
                        <UplotChart chartData={chart} />
                    </div>
                );
            })}
        </div>
    );
};
