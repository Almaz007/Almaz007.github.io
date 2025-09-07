import { Table } from "@/shared/ui";
import { useModemData } from "../../hooks/useModemData";
import styles from "./styles.module.css";

export const ModemParametrs = () => {
    const {
        renderSatelliteHead,
        renderCoordinateHead,
        renderDateTimeHead,
        renderActiveSatelliteRow,
        renderViewSatelliteRow,
        renderCoordinatesRow,
        renderDateTimeRow,
    } = useModemData();

    return (
        <div className={styles["tables"]}>
            <Table
                rowItems={[null]}
                renderHead={renderSatelliteHead}
                renderRow={renderActiveSatelliteRow}
                maxWidth={700}
            />
            <Table
                rowItems={[null]}
                renderHead={renderSatelliteHead}
                renderRow={renderViewSatelliteRow}
                maxWidth={700}
            />
            <Table
                rowItems={[null]}
                renderHead={renderCoordinateHead}
                renderRow={renderCoordinatesRow}
                maxWidth={700}
            />
            <Table
                rowItems={[null]}
                renderHead={renderDateTimeHead}
                renderRow={renderDateTimeRow}
                maxWidth={700}
            />
        </div>
    );
};
