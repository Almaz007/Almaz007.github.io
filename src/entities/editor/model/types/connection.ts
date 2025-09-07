import { TDataType } from "@/shared/types";

type TColor = {
    clr: string;
    selectedClr: string;
};
export type TColorsType = Record<TDataType, TColor>;

type MarkerType = undefined | "circle" | "arrow-closed";
export type TMarkerTypes = Record<TDataType, MarkerType>;
