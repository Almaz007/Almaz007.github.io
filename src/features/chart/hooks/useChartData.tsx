import { useRef } from "react";
import { Options, AlignedData } from "uplot";

type ChartSeries = {
    label: string;
    points?: { show: boolean };
    stroke?: string;
    fill?: string;
    width?: number;
};

export const useChartData = () => {
    const uPlotRef = useRef<HTMLDivElement>(null);

    const options: Options = {
        title: "График",
        width: 800,
        height: 300,
        series: [
            {
                label: "мс",
            },
            {
                label: "",
                points: { show: false },
                stroke: "blue",
                fill: "blue",
            },
        ] as ChartSeries[],
        scales: { x: { time: false } },
    };

    const chartData: AlignedData = [
        Array.from({ length: 20 }, (_, i) => i), // x-значения
        Array.from({ length: 20 }, (_, i) => i % 1000), // y-значения
    ];

    return { options, chartData, uPlotRef };
};
