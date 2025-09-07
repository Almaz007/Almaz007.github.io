import { ComponentType, ReactNode, SVGAttributes } from "react";
import { TNodeInstructionsTypes } from "../nodeInstructions";

export type TViewProps = {
    width: number;
    height: number;
    icon?: ReactNode;
    text?: string;
    name?: string;
    withoutEn?: boolean;
    inverse?: boolean;
} & SVGAttributes<SVGElement>;

export type TViewConfig = Partial<
    Record<
        TNodeInstructionsTypes,
        TViewProps & { view: ComponentType<TViewProps> }
    >
>;
