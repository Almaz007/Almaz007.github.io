export type TCfgData = {
    fileName: string;
    countsInfo: {
        total: number;
        analogueChannelsCount: number;
        discreteChannelsCount: number;
    };
    channelsData: {
        analogueChannels: string[];
        discreteChannels: string[];
    };
};
export type TChartsData = {
    id: number;
    name: string;
    xyData: {
        xData: number[];
        yData: number[];
    };
    visible: boolean;
};

export type TOscilogram = {
    // Склеиваем в 32-битное число
    cfgData: TCfgData;
    cfgDataLoad: boolean;
    cfgError: string;
    cfgLoaded: boolean;
    cursorIndex: number;
    sginalsData: { fileName: string; signals: Array<Array<number>> };
    signalDataLoad: boolean;
    signalDataError: string;
    signalsLoaded: boolean;

    chartsData: TChartsData[];
    chartBuffers: Record<number, Array<number>>;
    tempBuffer: number[];
    lastChartIndex: number;
    permision: boolean;
    updateCursorIndex: (idx: number) => void;
    handleChartChanged: (event: any) => void;
    chartNotificationStart: () => Promise<void>;
    chartNotificationStop: () => Promise<void>;

    handleCfgFile: (event: any) => void;
    handleDataFile: (event: any) => void;
    exportDataFile: () => void;
    exportCfgFile: () => void;
    generateChartsData: () => void;
    // cursorIndex: 0;
};
