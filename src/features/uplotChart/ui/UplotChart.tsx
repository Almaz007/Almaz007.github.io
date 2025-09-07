import { useOscilogramStore } from "@/entities/oscilogram/indes";
import { Chart } from "@/features/chart";
import { Options } from "uplot";
interface Props {
    chartData: TChartsData;
}
export type TChartsData = {
    id: number;
    name: string;
    xyData: {
        xData: number[];
        yData: number[];
    };
    visible: boolean;
};
const chartColors = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "yellow",
    "cyan",
    "magenta",
    "lime",
    "teal",
    "pink",
    "brown",
    "gold",
    "navy",
    "olive",
    "maroon",
    "turquoise",
    "indigo",
    "coral",
    "darkgreen",
    "slateblue",
    "tomato",
    "orchid",
    "darkorange",
    "lightseagreen",
    "mediumvioletred",
];

export const UplotChart = ({ chartData }: Props) => {
    const updateCursorIndex = useOscilogramStore(
        (state) => state.updateCursorIndex
    );

    const createOption = (title: string, color: string): Options => ({
        title,
        width: 1000,
        height: 350,
        scales: {
            x: { time: false },
            y: {
                auto: false,
                range: () => [0, 1800],
            },
        },
        series: [
            { label: "Время мс" },
            {
                label: "Значение",
                stroke: color,
                width: 2,
                fill: `${color}20`,
                points: { show: false },
            },
        ],
        axes: [{ label: "Время" }, { label: "Значение" }],
        cursor: {
            drag: { x: true, y: false },
            sync: { key: "syncCursor" },
        },
        legend: {
            show: true,
            live: false,
        },
        hooks: {
            setCursor: [
                (u) => {
                    const { idx } = u.cursor;
                    if (idx !== null) {
                        updateCursorIndex(idx ?? 0);
                    }
                },
            ],
        },
    });

    return (
        <Chart
            key={chartData.id}
            data={[chartData.xyData.xData, chartData.xyData.yData]}
            options={createOption(
                chartData.name,
                chartColors[chartData.id - 1]
            )}
        />
    );
};
