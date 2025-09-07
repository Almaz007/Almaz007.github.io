import { TDataType } from "@/shared/types";
import { useOffsets } from "../model/store";

export const addOffset = (dataType: TDataType, offset: number) => {
    const { offsetsByTypes, setOffsets } = useOffsets.getState();
    const offsets = [...offsetsByTypes[dataType]];

    setOffsets([...offsets, offset], dataType);
};
