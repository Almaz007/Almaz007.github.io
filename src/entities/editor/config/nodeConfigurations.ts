import { TNodeConfigurations } from "../model/types/node-config";

export const nodeConfigurations: TNodeConfigurations = {
    discreteInput: {
        outputHandles: { out: { dataType: "bool" } },
        inputHandles: {},
        type: "discreteInput",
    },
    discreteOutput: {
        inputHandles: { input: { dataType: "bool" } },
        outputHandles: {},
        type: "discreteOutput",
        name: "",
    },
    analogInput: {
        outputHandles: { out: { dataType: "analog" } },
        inputHandles: {},
        type: "analogInput",
    },
    analogOutput: {
        inputHandles: { input: { dataType: "float" } },
        outputHandles: {},
        type: "analogOutput",
        name: "",
    },
    xor: {
        inputHandles: {
            "input-1": { dataType: "bool" },
            "input-2": { dataType: "bool" },
        },
        outputHandles: { out: { dataType: "bool" } },
        type: "xor",
    },
    and: {
        inputHandles: {
            "input-1": { dataType: "bool" },
            "input-2": { dataType: "bool" },
        },
        outputHandles: { out: { dataType: "bool" } },
        type: "and",
    },
    or: {
        inputHandles: {
            "input-1": { dataType: "bool" },
            "input-2": { dataType: "bool" },
            "input-3": { dataType: "bool" },
        },
        outputHandles: { out: { dataType: "bool" } },
        type: "or",
    },
    nand: {
        inputHandles: {
            "input-1": { dataType: "bool" },
            "input-2": { dataType: "bool" },
            "input-3": { dataType: "bool" },
        },
        outputHandles: { out: { dataType: "bool" } },
        type: "nand",
    },
    nor: {
        inputHandles: {
            "input-1": { dataType: "bool" },
            "input-2": { dataType: "bool" },
            "input-3": { dataType: "bool" },
        },
        outputHandles: { out: { dataType: "bool" } },
        type: "nor",
    },
    notOperation: {
        inputHandles: { "input-1": { dataType: "bool" } },
        outputHandles: { out: { dataType: "bool" } },
        type: "notOperation",
    },
    sumInt: {
        inputHandles: {
            "input-1": { dataType: "int" },
            "input-2": { dataType: "int" },
        },
        outputHandles: { out: { dataType: "int" } },
        type: "sumInt",
    },
    multInt: {
        inputHandles: {
            "input-1": { dataType: "int" },
            "input-2": { dataType: "int" },
        },
        outputHandles: { out: { dataType: "int" } },
        type: "multInt",
    },
    subInt: {
        inputHandles: {
            "input-1": { dataType: "int" },
            "input-2": { dataType: "int" },
        },
        outputHandles: { out: { dataType: "int" } },
        type: "subInt",
    },
    equalsInt: {
        inputHandles: {
            "input-1": { dataType: "int" },
            "input-2": { dataType: "int" },
        },
        outputHandles: { out: { dataType: "bool" } },
        type: "equalsInt",
    },
    lessInt: {
        inputHandles: {
            "input-1": { dataType: "int" },
            "input-2": { dataType: "int" },
        },
        outputHandles: { out: { dataType: "bool" } },
        type: "lessInt",
    },
    moreInt: {
        inputHandles: {
            "input-1": { dataType: "int" },
            "input-2": { dataType: "int" },
        },
        outputHandles: { out: { dataType: "bool" } },
        type: "moreInt",
    },
    timerInt: {
        inputHandles: {},
        outputHandles: { out: { dataType: "int" } },
        setpointDataType: "int",
        setpointOffset: null,
        type: "timerInt",
        name: "",
    },
    constInt: {
        inputHandles: {},
        outputHandles: { out: { dataType: "int" } },
        setpointDataType: "int",
        setpointOffset: null,
        type: "constInt",
        name: "",
    },
    constBoolean: {
        inputHandles: {},
        outputHandles: { out: { dataType: "bool" } },
        setpointDataType: "int",
        setpointOffset: null,
        type: "constBoolean",
        name: "",
    },
    fourierInt: {
        inputHandles: {
            "input-1": { dataType: "analog" },
        },
        outputHandles: {
            "out-1": { dataType: "int" },
            "out-2": { dataType: "int" },
        },
        type: "fourierInt",
        setpointDataType: "int",
        setpointOffset: null,
    },
    fifoByte: {
        type: "fifoByte",
        lengthMemory: 1,
        inputHandles: {
            "input-1": { dataType: "bool" },
            "input-2": { dataType: "bool" },
        },
        outputHandles: {
            "out-1": { dataType: "bool" },
        },
    },
    fifoWord: {
        type: "fifoWord",
        lengthMemory: 1,
        inputHandles: {
            "input-1": { dataType: "int" },
            "input-2": { dataType: "bool" },
        },
        outputHandles: {
            "out-1": { dataType: "int" },
        },
    },
    fifoByteWithoutEn: {
        type: "fifoByteWithoutEn",
        lengthMemory: 1,
        inputHandles: {
            "input-1": { dataType: "bool" },
        },
        outputHandles: {
            "out-1": { dataType: "bool" },
        },
    },
    fifoWordWithoutEn: {
        type: "fifoWordWithoutEn",
        lengthMemory: 1,
        inputHandles: {
            "input-1": { dataType: "int" },
        },
        outputHandles: {
            "out-1": { dataType: "int" },
        },
    },
    dtrigger: {
        inputHandles: {},
        outputHandles: { out: { dataType: "bool" } },
        type: "dtrigger",
    },
};
