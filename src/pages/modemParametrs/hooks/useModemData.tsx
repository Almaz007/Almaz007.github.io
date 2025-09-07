import { useBleStore } from "@/shared/model";
import { shallow } from "zustand/shallow";
import { getDateForTimeStamp } from "../helpers/getDateForTimeStamp";
import { getTimeString } from "../helpers/getTimeString";

export const useModemData = () => {
    const {
        timestamp,
        timestampSubSeconds,
        latitude,
        longitude,
        altitude,
        is_valid,
        gp_sats_in_use,
        gl_sats_in_use,
        bd_sats_in_use,
        gp_sats_in_view,
        gl_sats_in_view,
        bd_sats_in_view,
        ppsFlag,
    } = useBleStore((state) => state.modemParameters, shallow);

    const renderSatelliteHead = () => (
        <>
            <th>GPS</th>
            <th>GlONNAS</th>
            <th>BEIDOU</th>
        </>
    );
    const renderCoordinateHead = () => (
        <>
            <th>Широта</th>
            <th>Долгота</th>
            <th>Высота</th>
        </>
    );
    const renderDateTimeHead = () => (
        <>
            <th>Дата</th>
            <th>Время</th>
        </>
    );

    //функции рендера строк
    const renderActiveSatelliteRow = () => (
        <>
            <td>{gp_sats_in_use}</td>
            <td>{gl_sats_in_use}</td>
            <td>{bd_sats_in_use}</td>
        </>
    );
    const renderViewSatelliteRow = () => (
        <>
            <td>{gp_sats_in_view}</td>
            <td>{gl_sats_in_view}</td>
            <td>{bd_sats_in_view}</td>
        </>
    );
    const renderCoordinatesRow = () => (
        <>
            <td>{is_valid ? +latitude.toFixed(6) : "не установлено"}</td>
            <td>{is_valid ? +longitude.toFixed(6) : "не установлено"}</td>
            <td>{is_valid ? +altitude.toFixed(2) : "не установлено"}</td>
        </>
    );
    const renderDateTimeRow = () => (
        <>
            <td>
                {timestamp === 0
                    ? "не установлено"
                    : getDateForTimeStamp(timestamp)}
            </td>
            <td>{getTimeString(timestamp, ppsFlag, timestampSubSeconds)}</td>
        </>
    );

    return {
        renderSatelliteHead,
        renderCoordinateHead,
        renderDateTimeHead,
        renderActiveSatelliteRow,
        renderViewSatelliteRow,
        renderCoordinatesRow,
        renderDateTimeRow,
    };
};
