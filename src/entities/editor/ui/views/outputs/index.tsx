import { AnalogOutputIcon } from "./icons/AnalogOutputIcon";
import { DiscreteOutputIcon } from "./icons/DiscreteOutputIcon";
import { TViewConfig } from "@/entities/editor/model/types/view";
import { OutputViewStructure } from "./OutputViewStruture/OutputViewStructure";

export const outputViews: TViewConfig = {
    discreteOutput: {
        view: OutputViewStructure,
        width: 280,
        height: 50,
        text: "Дискретный выход",
        icon: <DiscreteOutputIcon />,
        name: "Дискретный выход",
    },

    analogOutput: {
        view: OutputViewStructure,
        width: 280,
        height: 50,
        text: "Аналоговый выход",
        icon: <AnalogOutputIcon />,
        name: "Аналоговый выход",
    },
};
