import { TViewConfig } from "@/entities/editor/model/types/view";
import { FourierViewStructure } from "./FourierViewStructure";

export const FourierViews: TViewConfig = {
    fourierInt: {
        view: FourierViewStructure,
        width: 100,
        height: 140,
        name: "Фурье",
    },
};
