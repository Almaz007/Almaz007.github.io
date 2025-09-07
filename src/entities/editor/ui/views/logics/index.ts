import { TViewConfig } from "@/entities/editor/model/types/view";
import { LogicViewStructure } from "./LogicViewStructure/LogicViewStructure";

export const logicViews: TViewConfig = {
    and: {
        view: LogicViewStructure,
        width: 100,
        height: 120,
        text: "&",
        name: "Логическая и",
    },

    xor: {
        view: LogicViewStructure,
        width: 100,
        height: 120,
        text: "=1",
        name: "Исключающее или",
    },

    or: {
        view: LogicViewStructure,
        width: 100,
        height: 120,
        text: "1",
        name: "Логическая или",
    },
    nand: {
        view: LogicViewStructure,
        width: 100,
        height: 120,
        text: "&",
        name: "Инверсия лог-й и",
        inverse: true,
    },
    nor: {
        view: LogicViewStructure,
        width: 100,
        height: 120,
        text: "1",
        name: "Инверсия лог-й или",
        inverse: true,
    },
};
