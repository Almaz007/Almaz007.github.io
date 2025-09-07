import { TDataType } from "@/shared/types";
import { useSetpoints } from "../model/store";

export const addSetpointOffset = (dataType: TDataType, offset: number) => {
    const { setpointOffsets, setSetpointOffsets } = useSetpoints.getState();
    const offsets = [...setpointOffsets[dataType]];

    setSetpointOffsets([...offsets, offset], dataType);
};
