// features/context-menu/lib/action-config.ts
import { TNodeInstructionsTypes } from "@/entities/editor";
import { TActionName } from "./action-factories";

export const actionConfig: Partial<
    Record<TNodeInstructionsTypes, TActionName[]>
> = {
    analogInput: ["updateName", "updateSetpointValue", "delete", "dublicate"],
    discreteInput: ["updateName", "delete", "dublicate"],
    discreteOutput: ["updateName", "delete", "dublicate"],
    constInt: ["updateSetpointValue", "updateName", "delete", "dublicate"],
    fourierInt: ["updateName", "changeFourierGarmonics", "delete", "dublicate"],
    xor: ["delete", "dublicate"],
    and: ["invert", "delete", "dublicate"],
    or: ["invert", "delete", "dublicate"],
    nand: ["invert", "delete", "dublicate"],
    nor: ["invert", "delete", "dublicate"],
    multInt: ["delete", "dublicate"],
    sumInt: ["delete", "dublicate"],
    subInt: ["delete", "dublicate"],
    timerInt: ["updateSetpointValue", "updateName", "delete", "dublicate"],
    equalsInt: ["delete", "dublicate"],
    lessInt: ["delete", "dublicate"],
    moreInt: ["delete", "dublicate"],
    fifoByte: ["updateLengthMemory", "delete", "dublicate"],
    fifoByteWithoutEn: ["updateLengthMemory", "delete", "dublicate"],
    fifoWord: ["updateLengthMemory", "delete", "dublicate"],
    fifoWordWithoutEn: ["updateLengthMemory", "delete", "dublicate"],
};
