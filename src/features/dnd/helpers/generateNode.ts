import {
    TBaseNodeData,
    TNodeDataWithNullOffset,
    TNodeData,
    TSetpointNodeData,
    TNodeInstructionsTypes,
    nodeConfigurations,
} from "@/entities/editor";
import { getSetpointOffset } from "@/shared/model/setpoint";
// import { TFifoNodeDataWithNullOffset } from "@/entities/editor";
import { XYPosition, Node } from "@xyflow/react";
import { enqueueSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";

// export const generateFifoNodeData = (
//     config: TBaseNodeData &
//         Pick<
//             TFifoNodeDataWithNullOffset,
//             "ptrBegin" | "workingSpace" | "lengthMemory"
//         >
// ): TFifoNodeData | null => {
//     const { lengthMemory } = config;

//     return {
//         type: config.type,
//         inputHandles: config.inputHandles,
//         outputHandles: config.outputHandles,
//         name: config.name,
//         lengthMemory,
//     };
// };

export const generateData = (
    config: TNodeDataWithNullOffset
): TNodeData | null => {
    const baseData: TBaseNodeData = {
        type: config.type,
        inputHandles: config.inputHandles,
        outputHandles: config.outputHandles,
        ...(config.name && { name: config.name }),
    };

    if ("lengthMemory" in config) {
        return { ...baseData, lengthMemory: config.lengthMemory };
    }

    if ("setpointDataType" in config) {
        const setpointOffset = getSetpointOffset(config.setpointDataType);
        if (setpointOffset === undefined) return null;
        const withSetpoint: TSetpointNodeData = {
            ...baseData,
            setpointDataType: config.setpointDataType,
            setpointOffset,
        };
        return withSetpoint;
    }

    return baseData;
};
export const generateNode = (
    type: TNodeInstructionsTypes,
    position: XYPosition
): Node<TNodeData> | null => {
    const data = nodeConfigurations[type];

    if (!data) {
        enqueueSnackbar(`Неизвестный тип узла: ${type}`, { variant: "error" });
        return null;
    }

    const nodeData = generateData(data);
    if (!nodeData) {
        enqueueSnackbar(`Не удалось выделить память`, { variant: "error" });
        return null;
    }

    return {
        id: uuidv4(),
        type: "node",
        position,
        data: {
            ...nodeData,
        },
    };
};
