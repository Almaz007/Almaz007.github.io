import { TDataType } from "@/shared/types";
import { useSetpoints } from "../model/store";

export const getSetpointOffset = (dataType: TDataType) => {
    const { setpointOffsets, setSetpointOffsets } = useSetpoints.getState();
    const newSetpointOffsets = [...setpointOffsets[dataType]];
    const setpointOffset = newSetpointOffsets.shift();
    setSetpointOffsets(newSetpointOffsets, dataType);

    return setpointOffset;
};
