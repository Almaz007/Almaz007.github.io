import { TViewConfig } from "@/entities/editor/model/types/view";
import { AlgebraicViewStructure } from "./AlgebraicViewStructure/AlgebraicViewStructure";

export const algebraicViews: TViewConfig = {
    multInt: {
        view: AlgebraicViewStructure,
        width: 100,
        height: 120,
        text: "×",
        name: "Операция математического умножения int",
    },
    // multFloat: {
    //     view: AlgebraicViewStructure,
    //     width: 100,
    //     height: 120,
    //     text: "&",
    //     name: "Логическая и",
    // },

    sumInt: {
        view: AlgebraicViewStructure,
        width: 100,
        height: 120,
        text: "+",
        name: "Операция математического сложения int",
    },

    subInt: {
        view: AlgebraicViewStructure,
        width: 100,
        height: 120,
        text: "-",
        name: "Операция математического вычитания int",
    },
};
