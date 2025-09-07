import { useSetpoints } from "@/shared/model/setpoint";
import { combineBytesToFloat, combineBytesToInt } from "./convertBytes";

import { TDataType } from "@/shared/types";
export const getValueByOfffset = (dataType: TDataType, offset: number) => {
    const { setpointsValues } = useSetpoints.getState();

    let value = 0;
    if (dataType === "int") {
        value = combineBytesToInt([
            ...setpointsValues.slice(offset, offset + 4),
        ]);
    }
    if (dataType === "float") {
        value = combineBytesToFloat([
            ...setpointsValues.slice(offset, offset + 4),
        ]);
    }
    if (dataType === "bool") {
        value = setpointsValues[offset];
    }

    return value;
};
