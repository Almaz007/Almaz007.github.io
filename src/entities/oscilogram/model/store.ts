import { useBleStore } from "@/shared/model";
import { TOscilogram } from "./type";
import { createWithEqualityFn } from "zustand/traditional";
import { TChartsData } from "./type";
import { ChangeEvent } from "react";
import Papa from "papaparse";
import { TCfgData } from "./type";
import { downloadFile } from "@/shared/helpers/helpers";

export const useOscilogramStore = createWithEqualityFn<TOscilogram>(
    (set, get) => ({
        cfgData: {
            fileName: "",
            countsInfo: {
                total: 0,
                analogueChannelsCount: 0,
                discreteChannelsCount: 0,
            },
            channelsData: {
                analogueChannels: [],
                discreteChannels: [],
            },
        },
        cursorIndex: 0,
        cfgDataLoad: false,
        cfgError: "",
        cfgLoaded: false,

        sginalsData: {
            fileName: "",
            signals: [],
        },
        signalDataLoad: false,
        signalDataError: "",
        signalsLoaded: false,
        chartBuffers: {
            0: [],
            1: [],
            2: [],
            3: [],
        },
        tempBuffer: [],
        chartsData: [],
        permision: false,
        lastChartIndex: 0,
        count: 0,

        updateCursorIndex: (idx) => {
            const { cursorIndex } = get();
            if (cursorIndex !== idx) {
                set({ cursorIndex: idx });
            }
        },

        handleChartChanged: (event) => {
            const newPart = Array.from(
                new Uint16Array(event.target.value.buffer)
            );
            console.log("Пришёл пакет:", newPart);

            const PHASE_SIZE = 82; // длина блока для одной фазы
            const PHASE_COUNT = 3; // три фазы в пакете
            const PHASE_NAMES = ["A", "B", "C"];

            const phases = [];

            // --- Парсим первую фазу ---
            const phaseNumberA = newPart[1];
            const xDataA: number[] = [];
            const yDataCh1A: number[] = [];
            const yDataCh2A: number[] = [];

            for (let i = 2; i < PHASE_SIZE; i += 4) {
                const lo = newPart[i];
                const hi = newPart[i + 1];
                const ch1 = newPart[i + 2];
                const ch2 = newPart[i + 3];

                if (
                    lo === undefined ||
                    hi === undefined ||
                    ch1 === undefined ||
                    ch2 === undefined
                ) {
                    break;
                }

                const xNum = (hi << 16) | lo;
                xDataA.push(xNum);
                yDataCh1A.push(ch1);
                yDataCh2A.push(ch2);
            }

            phases.push({
                phase: "A",
                phaseNumber: phaseNumberA,
                xData: xDataA,
                yDataCh1: yDataCh1A,
                yDataCh2: yDataCh2A,
            });

            // --- Вторая и третья фазы ---
            for (let phaseIndex = 1; phaseIndex < PHASE_COUNT; phaseIndex++) {
                const offset = phaseIndex * PHASE_SIZE;
                const phaseName = PHASE_NAMES[phaseIndex];
                const phaseNumber = newPart[offset + 1];

                const xData: number[] = [];
                const yDataCh1: number[] = [];
                const yDataCh2: number[] = [];

                let pointIndex = 0;
                for (let i = offset + 2; i < offset + PHASE_SIZE; i += 4) {
                    const lo = newPart[i];
                    const hi = newPart[i + 1];
                    const ch1 = newPart[i + 2];
                    const ch2 = newPart[i + 3];

                    if (ch1 === undefined || ch2 === undefined) break;

                    let xNum: number;
                    if (
                        lo === 0 &&
                        hi === 0 &&
                        phases[0].xData[pointIndex] !== undefined
                    ) {
                        // нет связи, берём метку времени первой фазы
                        xNum = phases[0].xData[pointIndex];
                    } else {
                        xNum = (hi << 16) | lo;
                    }

                    xData.push(xNum);
                    yDataCh1.push(ch1);
                    yDataCh2.push(ch2);
                    pointIndex++;
                }

                phases.push({
                    phase: phaseName,
                    phaseNumber,
                    xData,
                    yDataCh1,
                    yDataCh2,
                });
            }

            // --- Формируем TChartsData ---
            const chartsData: TChartsData[] = [];

            phases.forEach((p, idx) => {
                chartsData.push({
                    id: idx * 2 + 1,
                    name: `Фаза ${p.phase} (№${p.phaseNumber}) / Канал 1`,
                    xyData: { xData: p.xData, yData: p.yDataCh1 },
                    visible: true,
                });
                chartsData.push({
                    id: idx * 2 + 2,
                    name: `Фаза ${p.phase} (№${p.phaseNumber}) / Канал 2`,
                    xyData: { xData: p.xData, yData: p.yDataCh2 },
                    visible: true,
                });
            });

            set({ chartsData });
        },

        chartNotificationStart: async () => {
            const {
                addLog,
                characteristics: { oscill_service_tx_chararcteristic },
            } = useBleStore.getState();
            const { handleChartChanged } = get();
            await oscill_service_tx_chararcteristic.startNotifications();

            oscill_service_tx_chararcteristic.addEventListener(
                "characteristicvaluechanged",
                handleChartChanged
            );
            addLog("charts notification started");
        },
        chartNotificationStop: async () => {
            const {
                addLog,
                characteristics: { oscill_service_tx_chararcteristic },
            } = useBleStore.getState();
            const { handleChartChanged } = get();
            await oscill_service_tx_chararcteristic.stopNotifications();

            oscill_service_tx_chararcteristic.removeEventListener(
                "characteristicvaluechanged",
                handleChartChanged
            );
            set({
                chartBuffers: {
                    0: [],
                    1: [],
                    2: [],
                    3: [],
                },
                lastChartIndex: 0,
                permision: false,
            });
            addLog("charts notification stopped");
        },
        handleCfgFile: (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            let decoder = new TextDecoder("windows-1251");

            reader.readAsArrayBuffer(file);

            reader.onload = function () {
                const text = decoder
                    .decode(reader.result as ArrayBuffer)
                    .split("\r\n");

                const countsData = text[1].split(",");

                const countsInfo = {
                    total: +countsData[0],
                    analogueChannelsCount: +countsData[1]?.slice(0, -1),
                    discreteChannelsCount: +countsData[2]?.slice(0, -1),
                };
                const chanels = text.slice(2, 2 + countsInfo.total);

                const { analogueChannelsCount } = countsInfo;

                const channelsData = {
                    analogueChannels: chanels.slice(0, analogueChannelsCount),
                    discreteChannels: chanels.slice(analogueChannelsCount),
                };
                const cfgData: TCfgData = {
                    fileName: file.name,
                    countsInfo,
                    channelsData,
                };
                set({
                    cfgData: { ...cfgData },
                    cfgLoaded: true,
                });
            };

            reader.onerror = function () {
                const errorMessage =
                    reader.error?.message ?? "Неизвестная ошибка чтения файла";
                set({ cfgError: errorMessage });

                console.error(reader.error);
            };
        },
        handleDataFile: (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            Papa.parse(file, {
                header: false,
                dynamicTyping: true,
                complete: function (results: Papa.ParseResult<Array<number>>) {
                    set({
                        sginalsData: {
                            fileName: file.name,
                            signals: results.data.slice(0, -1),
                        },
                        signalsLoaded: true,
                    });
                },
                error: function (error) {
                    const errorMessage =
                        error?.message ?? "Неизвестная ошибка чтения файла";

                    set({
                        signalDataError: errorMessage,
                        signalsLoaded: false,
                    });
                    console.error("Error parsing CSV:", errorMessage);
                },
            });
        },
        exportCfgFile: () => {},
        exportDataFile: () => {
            const { chartsData } = get();
            const generealLength = chartsData[0].xyData.xData.length;
            const xData = chartsData[0].xyData.xData;

            let res: string[] = [];
            for (let i = 0; i < generealLength; i++) {
                let arr = [i + 1, xData[i]];

                for (let j = 0; j < chartsData.length; j++) {
                    arr.push(chartsData[j].xyData.yData[i]);
                }
                res.push(arr.join(", "));
            }

            downloadFile(res.join("\n"), "data.dat", "text/plain");
        },
        generateChartsData: () => {
            const { cfgData, sginalsData } = get();
            const { analogueChannels } = cfgData.channelsData;

            const chartsData: TChartsData[] = [];

            [...analogueChannels].map((chanel, index) => {
                let [number, id] = chanel.split(",");
                index = index + 2;
                // const xyData = signals.map(signal => ({
                // 	x: signal[1],
                // 	y: signal[index]
                // }));
                const xyData = sginalsData.signals.reduce(
                    (acc, signal) => {
                        acc["xData"].push(signal[1]);
                        acc["yData"].push(signal[index]);
                        return acc;
                    },
                    { xData: [] as number[], yData: [] as number[] }
                );

                const dataForChannel = {
                    name: id,
                    id: +number,
                    xyData,
                    visible: true,
                };

                chartsData.push(dataForChannel);
            });

            set({
                chartsData: chartsData,
            });
        },
    })
);
