import { TNodeInstructionsTypes } from "@/entities/editor";
import { XYPosition } from "@xyflow/react";

type TTemplateItem = {
    type: TNodeInstructionsTypes;
    position: XYPosition;
};

const ikz: TTemplateItem[] = [
    {
        type: "analogInput",
        position: {
            x: 0,
            y: 0,
        },
    },
    {
        type: "analogInput",
        position: {
            x: 0,
            y: 60,
        },
    },
    {
        type: "analogInput",
        position: {
            x: 0,
            y: 120,
        },
    },

    {
        type: "discreteOutput",
        position: {
            x: 1500,
            y: 0,
        },
    },
    {
        type: "discreteOutput",
        position: {
            x: 1500,
            y: 60,
        },
    },
    {
        type: "discreteOutput",
        position: {
            x: 1500,
            y: 120,
        },
    },
    {
        type: "discreteOutput",
        position: {
            x: 1500,
            y: 180,
        },
    },
    {
        type: "discreteOutput",
        position: {
            x: 1500,
            y: 240,
        },
    },
];

const rza: TTemplateItem[] = [
    {
        type: "analogInput",
        position: {
            x: 0,
            y: 0,
        },
    },
    {
        type: "analogInput",
        position: {
            x: 0,
            y: 60,
        },
    },
    {
        type: "analogInput",
        position: {
            x: 0,
            y: 120,
        },
    },
    {
        type: "analogInput",
        position: {
            x: 0,
            y: 180,
        },
    },
    {
        type: "analogInput",
        position: {
            x: 0,
            y: 240,
        },
    },
    {
        type: "analogInput",
        position: {
            x: 0,
            y: 300,
        },
    },

    {
        type: "discreteInput",
        position: {
            x: 0,
            y: 360,
        },
    },
    {
        type: "discreteInput",
        position: {
            x: 0,
            y: 420,
        },
    },
    {
        type: "discreteInput",
        position: {
            x: 0,
            y: 480,
        },
    },
    {
        type: "discreteInput",
        position: {
            x: 0,
            y: 540,
        },
    },
    {
        type: "discreteInput",
        position: {
            x: 0,
            y: 600,
        },
    },
    {
        type: "discreteInput",
        position: {
            x: 0,
            y: 660,
        },
    },

    {
        type: "discreteOutput",
        position: {
            x: 1500,
            y: 0,
        },
    },
    {
        type: "discreteOutput",
        position: {
            x: 1500,
            y: 60,
        },
    },
    {
        type: "discreteOutput",
        position: {
            x: 1500,
            y: 120,
        },
    },
    {
        type: "discreteOutput",
        position: {
            x: 1500,
            y: 180,
        },
    },
    {
        type: "discreteOutput",
        position: {
            x: 1500,
            y: 240,
        },
    },
];
const template1: TTemplateItem[] = [
    {
        type: "analogInput",
        position: {
            x: 0,
            y: 0,
        },
    },
    {
        type: "fifoWordWithoutEn",
        position: {
            x: 530,
            y: -150,
        },
    },
    {
        type: "fourierInt",
        position: {
            x: 360,
            y: -5,
        },
    },
    {
        type: "subInt",
        position: {
            x: 750,
            y: -60,
        },
    },
    {
        type: "constInt",
        position: {
            x: 550,
            y: 250,
        },
    },
    {
        type: "constInt",
        position: {
            x: 550,
            y: 350,
        },
    },
    {
        type: "moreInt",
        position: {
            x: 970,
            y: -100,
        },
    },
    {
        type: "lessInt",
        position: {
            x: 970,
            y: 100,
        },
    },
    {
        type: "or",
        position: {
            x: 1180,
            y: -50,
        },
    },
    {
        type: "discreteOutput",
        position: {
            x: 1400,
            y: 0,
        },
    },
];
export const templates = {
    ikz,
    rza,
    template1,
};
