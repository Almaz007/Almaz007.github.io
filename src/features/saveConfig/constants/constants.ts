import { TDataType } from "@/shared/types";

export const TYPE_SIZES: Record<TDataType, number> = {
    bool: 1,
    int: 4,
    float: 4,
    analog: 160,
};
