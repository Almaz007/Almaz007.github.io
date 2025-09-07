import { useEffect, useRef } from "react";

import { useOscilogramStore } from "@/entities/oscilogram/indes";
import { shallow } from "zustand/shallow";
import styles from "./styles.module.css";
import { Button } from "@/shared/ui";

type Props = {};

export const ImportExportBtns = ({}: Props) => {
    const cfgFileBtnRef = useRef<HTMLInputElement | null>(null);
    const dataFileBtnRef = useRef<HTMLInputElement | null>(null);

    const [
        handleCfgFile,
        handleDataFile,
        generateChartsData,
        cfgData,
        cfgLoaded,
        sginalsData,
        signalsLoaded,
        _,
        exportDataFile,
    ] = useOscilogramStore(
        (state) => [
            state.handleCfgFile,
            state.handleDataFile,
            state.generateChartsData,
            state.cfgData,
            state.cfgLoaded,
            state.sginalsData,
            state.signalsLoaded,
            state.exportCfgFile,
            state.exportDataFile,
        ],
        shallow
    );

    const handleCfgButtonClick = () => {
        cfgFileBtnRef.current?.click();
    };
    const handleDataButtonClick = () => {
        dataFileBtnRef.current?.click();
    };

    useEffect(() => {
        if (signalsLoaded && cfgLoaded) {
            generateChartsData();
        }
    }, [signalsLoaded, cfgLoaded]);

    return (
        <div className={styles["btn-rows"]}>
            <div className={styles["fileBtn"]}>
                <Button onClick={handleCfgButtonClick} text="Загрузить cfg" />
                <input
                    ref={cfgFileBtnRef}
                    type="file"
                    onChange={handleCfgFile}
                    accept=".cfg"
                    hidden
                />
                {cfgLoaded && (
                    <p className="download-status">
                        загружен {cfgData.fileName}
                    </p>
                )}
            </div>
            <div className={styles["fileBtn"]}>
                <Button
                    text={"Загрузить данные"}
                    onClick={handleDataButtonClick}
                />
                <input
                    ref={dataFileBtnRef}
                    type="file"
                    onChange={handleDataFile}
                    hidden
                    accept=".dat, .csv"
                />
                {signalsLoaded && (
                    <p className="download__status">
                        загружен {sginalsData.fileName}
                    </p>
                )}
            </div>
            {/* <div className={styles["fileBtn"]}>
                <Button text={"экспорт .cfg"} onClick={exportCfgFile} />
            </div> */}
            <div className={styles["fileBtn"]}>
                <Button text={"экспорт .data"} onClick={exportDataFile} />
            </div>
        </div>
    );
};
