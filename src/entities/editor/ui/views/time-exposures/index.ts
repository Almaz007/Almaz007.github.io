import { TViewConfig } from "@/entities/editor/model/types/view";
import { TimeExposuresViewStructure } from "./TimeExposuresViewStructure/TimeExposuresViewStructure";

export const timeExposuresViews: TViewConfig = {
    timerInt: {
        view: TimeExposuresViewStructure,
        width: 100,
        height: 100,
        name: "Таймер",
    },
};
