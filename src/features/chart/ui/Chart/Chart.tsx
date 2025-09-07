import UplotReact from "uplot-react";
import { Options, AlignedData } from "uplot";
import "uplot/dist/uPlot.min.css"; // Не забудьте стили!

interface Props {
    data: AlignedData;
    options: Options;
}

export const Chart = ({ data, options }: Props) => {
    // Данные графика: [x-значения, y1, y2, ...]

    return (
        <div style={{ padding: "20px" }}>
            <UplotReact options={options} data={data} />
        </div>
    );
};
