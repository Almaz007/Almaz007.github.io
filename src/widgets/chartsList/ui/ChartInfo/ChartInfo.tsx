import { useOscilogramStore } from "@/entities/oscilogram/indes";
import styles from "./styles.module.css";
import { TChartsData } from "@/entities/oscilogram/indes";

interface Props {
    data: TChartsData;
}
const ChatInfo = ({ data }: Props) => {
    const { xData, yData } = data.xyData;
    const cursorIndex = useOscilogramStore((state) => state.cursorIndex);
    // console.log('render chatinfo: ', data.id);
    return (
        <div className={styles["chart-info"]}>
            <div className={styles["name"]}>name: {data.name}</div>
            <div className={styles["time"]}>time: {xData[cursorIndex]}</div>
            <div className={styles["value"]}>value: {yData[cursorIndex]}</div>
        </div>
    );
};

export default ChatInfo;
