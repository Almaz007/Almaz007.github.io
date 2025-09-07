import { TDataType } from "@/shared/types";
import { useOffsets } from "../model/store";

export const getOffsetsByFifo = (length: number, dataType: TDataType) => {
    const { offsetsByTypes, setOffsets } = useOffsets.getState();
    const offsets = [...offsetsByTypes[dataType]];

    const ptrBegin = offsets[0];
    const occupiedOffsets = offsets.splice(0, length);

    setOffsets(offsets, dataType);

    return { ptrBegin, occupiedOffsets };
};
