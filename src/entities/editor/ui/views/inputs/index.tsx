import { AnalogInputIcon } from "./Icons/AnalogInputIcon";
import { DiscreteInputIcon } from "./Icons/DiscreteInputIcon";
import { InputViewStructure } from "./InputViewStruture/InputViewStructure";
import { TViewConfig } from "@/entities/editor/model/types/view";

export const inputViews: TViewConfig = {
    discreteInput: {
        view: InputViewStructure,
        width: 280,
        height: 50,
        text: "Дискретный вход",
        icon: <DiscreteInputIcon />,
        name: "Дискретный вход",
    },

    analogInput: {
        view: InputViewStructure,
        width: 280,
        height: 50,
        text: "Аналоговый вход",
        icon: <AnalogInputIcon />,
        name: "Аналоговый вход",
    },
    constInt: {
        view: InputViewStructure,
        width: 280,
        height: 50,
        text: "Переменная",
        name: "Значение переменной типа int",
    },
};
