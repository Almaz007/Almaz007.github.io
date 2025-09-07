import { TDataType } from "@/shared/types";
import { useOffsets } from "../model/store";

export const getOffset = (dataType: TDataType) => {
    const { offsetsByTypes, setOffsets } = useOffsets.getState();
    const offsets = [...offsetsByTypes[dataType]];
    const resultOffset = offsets.shift();
    setOffsets(offsets, dataType);
    return resultOffset;
};
