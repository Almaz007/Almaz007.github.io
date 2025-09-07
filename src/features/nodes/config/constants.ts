import { TNodeInstructionsTypes } from "@/entities/editor";

export const typeColor = {
    bool: "var(--bool-clr)",
    int: "var(--int-clr)",
    float: "var(--float-clr)",
};

export const inverseTypes: Partial<
    Record<TNodeInstructionsTypes, TNodeInstructionsTypes>
> = {
    or: "nor",
    and: "nand",
    nor: "or",
    nand: "and",
};
