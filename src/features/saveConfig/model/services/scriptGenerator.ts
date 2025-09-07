import { nodeInstructions, TNodeData } from "@/entities/editor";
import { generateNewBufferData } from "../../helpers/generateNewBufferData";
import { TInstructionsBuffer, TScriptItem } from "../type";
import { Edge, getConnectedEdges, getIncomers, Node } from "@xyflow/react";
import { getKeysByObj } from "@/shared/helpers";
import { TDataType } from "@/shared/types";
import { TOffsetsStore } from "../type";
import { useAnalyzerStore } from "@/entities/analyzer";

export const createInstructionsBuffer = (): TInstructionsBuffer => ({
    lastLength: 0,
    instructions: [],
    offsets: [],
    primitivesData: {},
});
const TYPE_SIZES: Record<TDataType, number> = {
    bool: 1,
    int: 4,
    float: 4,
    analog: 160,
};

export const processNodeInstruction = (
    node: Node<TNodeData>,
    handlesCount: number,
    instructionsBuffer: TInstructionsBuffer
) => {
    const type = node.data.type;
    // const handlesCount = Object.keys(node.data.inputHandles).length;
    const instructionsNames = getKeysByObj(nodeInstructions);

    if (
        instructionsNames.includes(type) &&
        !instructionsBuffer.primitivesData[type]?.[handlesCount]
    ) {
        const nodeInstruction = nodeInstructions[type];
        if (nodeInstruction && nodeInstruction[handlesCount]) {
            instructionsBuffer.instructions.push(
                ...nodeInstruction[handlesCount].instruction
            );

            const { newOffset, newPrimitiveData, lastLength } =
                generateNewBufferData(
                    nodeInstructions[type][handlesCount],
                    instructionsBuffer.offsets,
                    instructionsBuffer.lastLength
                );

            instructionsBuffer.primitivesData[type] = {
                ...instructionsBuffer.primitivesData[type],
                [handlesCount]: newPrimitiveData,
            };

            instructionsBuffer.offsets.push(newOffset);
            instructionsBuffer.lastLength = lastLength;
        }
    }
};

const checkInputHandles = (targetsEdges: Edge[], node: Node<TNodeData>) => {
    try {
        const handleIds = Object.keys(node.data.inputHandles);

        if (handleIds.length === 0) return true;

        for (const handleId of handleIds) {
            const edge = targetsEdges.find(
                (edge) => edge.targetHandle === `${node.id} ${handleId}`
            );
            if (!edge) {
                throw new Error(
                    `Не найдено исходное смещение для handle ${handleId} узла ${node.id}`
                );
            }
        }
    } catch (error) {
        throw new Error(
            `Ошибка при создании scriptItem для узла ${node.id}: ${
                error instanceof Error ? error.message : String(error)
            }`
        );
    }
};

const createScriptItem = (
    node: Node<TNodeData>,
    inputs: Edge[],
    instructionsBuffer: TInstructionsBuffer,
    offsets: TOffsetsStore,
    _: TOffsetsStore,
    offsetsMap: Map<string, number>,
    outputOffsetsMap: Map<string, number>,
    analogInputsOffsets: TOffsetsStore
): TScriptItem => {
    try {
        const { initOscillographicOffsets, checkOffset } =
            useAnalyzerStore.getState();
        const type = node.data.type;

        const inputHandlesCount = Object.keys(node.data.inputHandles).length;

        let resultOffsets;

        if (type.includes("Output")) {
            resultOffsets = [outputOffsetsMap.get(node.id)] as number[];
        } else {
            resultOffsets = Object.entries(node.data.outputHandles).map(
                ([handleId]) => offsetsMap.get(`${node.id} ${handleId}`)
            ) as number[];

            Object.entries(node.data.outputHandles).forEach(
                ([handleId, handle]) => {
                    const offset = offsetsMap.get(`${node.id} ${handleId}`);

                    if (offset === undefined) {
                        throw new Error(
                            `Не найдено смещение в мапе для handle ${handleId} узла ${node.id}`
                        );
                    }

                    if (handle.oscillography) {
                        initOscillographicOffsets(
                            offset,
                            handle.name ?? "",
                            TYPE_SIZES[handle.dataType],
                            handle.dataType
                        );
                    } else {
                        checkOffset(offset);
                    }
                }
            );
        }

        let sourcesOffsets = Object.keys(node.data.inputHandles).reduce(
            (acc, handleId) => {
                const sourceHandle = inputs.find(
                    (edge) => `${node.id} ${handleId}` === edge.targetHandle
                )?.sourceHandle;

                if (!sourceHandle) {
                    throw new Error(
                        `Не найдено исходный handle для handle ${handleId} узла ${node.id}`
                    );
                }

                const sourceOffset = offsetsMap.get(sourceHandle);

                if (sourceOffset === undefined) {
                    throw new Error(
                        `Не найдено исходный узел для handle ${handleId} узла ${node.id}`
                    );
                }

                acc.push(sourceOffset);
                return acc;
            },
            [] as number[]
        );
        if (node.data.type === "analogInput") {
            const dataType = Object.values(node.data.outputHandles)[0].dataType;
            const offset = analogInputsOffsets[dataType].splice(
                0,
                dataType === "analog"
                    ? TYPE_SIZES[dataType] / 2
                    : TYPE_SIZES[dataType]
            )[0];
            sourcesOffsets = [offset];
        }

        if ("setpointDataType" in node.data) {
            // const off = setpointOffsets[node.data.setpointDataType].splice(
            //     0,
            //     TYPE_SIZES[node.data.setpointDataType]
            // )[0];
            // if (off === undefined) {
            //     throw new Error(
            //         `Не найдено смещение для уставки в ноде ${node.id}`
            //     );
            // }
            // sourcesOffsets.unshift(off);
            sourcesOffsets.unshift(node.data.setpointOffset!);
        }

        if (type === "fourierInt") {
            return {
                inType: nodeInstructions[type]?.[inputHandlesCount]?.in_type,
                sourcesOffsets,
                resultOffsets,
            };
        }

        if ("lengthMemory" in node.data) {
            const dataType = Object.values(node.data.outputHandles)[0].dataType;
            const lengthMemory = node.data.lengthMemory;
            const fifioOffset = offsets[dataType].splice(
                0,
                lengthMemory * TYPE_SIZES[dataType]
            )[0];
            const workingSpace = offsets["int"].splice(0, TYPE_SIZES["int"])[0];

            return {
                inType: nodeInstructions[type]?.[inputHandlesCount]?.in_type,
                instructionOffset: instructionsBuffer.primitivesData[type]?.[
                    inputHandlesCount
                ]?.offset as number,
                ptrBegin: fifioOffset,
                lengthMemory,
                resultOffsets,
                sourcesOffsets,
                workingSpace,
            };
        }

        return {
            inType: nodeInstructions[type]?.[inputHandlesCount]?.in_type,
            instructionOffset:
                instructionsBuffer.primitivesData[type]?.[inputHandlesCount]
                    ?.offset,
            resultOffsets,
            sourcesOffsets,
        };
    } catch (error) {
        throw new Error(
            `Ошибка при создании scriptItem для узла ${node.id}: ${
                error instanceof Error ? error.message : String(error)
            }`
        );
    }
};

export function generateScriptRecursive(
    node: Node<TNodeData>,
    visited: Set<string>,
    scripts: TScriptItem[],
    buffer: TInstructionsBuffer,
    offsets: TOffsetsStore,
    offsetsMap: Map<string, number>,
    setpointOffsets: TOffsetsStore,
    outputOffsetsMap: Map<string, number>,
    analogInputsOffsets: TOffsetsStore,
    nodes: Node<TNodeData>[],
    edges: Edge[]
) {
    if (visited.has(node.id)) return;
    visited.add(node.id);

    if (node.data.type !== "fourierInt") {
        processNodeInstruction(
            node,
            Object.keys(node.data.inputHandles).length,
            buffer
        );
    }

    const edgesForNode = getConnectedEdges([node], edges);

    const { targets: inputs } = edgesForNode.reduce(
        (acc, e) => {
            if (e.source === node.id) acc.sources.push(e);
            if (e.target === node.id) acc.targets.push(e);
            return acc;
        },
        { sources: [] as Edge[], targets: [] as Edge[] }
    );

    checkInputHandles(inputs, node);
    const incomers = getIncomers(node, nodes, edges);

    const scriptItem = createScriptItem(
        node,
        inputs,
        buffer,
        offsets,
        setpointOffsets,
        offsetsMap,
        outputOffsetsMap,
        analogInputsOffsets
    );
    incomers.forEach((inc) =>
        generateScriptRecursive(
            inc,
            visited,
            scripts,
            buffer,
            offsets,
            offsetsMap,
            setpointOffsets,
            outputOffsetsMap,
            analogInputsOffsets,
            nodes,
            edges
        )
    );

    scripts.push(scriptItem);
}

export const planOffsets = (
    nodes: Node<TNodeData>[],
    offsets: TOffsetsStore,
    outputOffsetsStore: TOffsetsStore
) => {
    const handleOffsetsMap = new Map();
    const outputOffsetsMap = new Map();

    nodes.forEach((node) => {
        const type = node.data.type;

        if (type.toLocaleLowerCase().includes("out")) {
            const dataType = Object.values(node.data.inputHandles)[0].dataType;
            const offset = outputOffsetsStore[dataType].shift();
            outputOffsetsMap.set(node.id, offset);
        }

        Object.entries(node.data.outputHandles).forEach(([handleId, _]) => {
            const dataType = Object.values(node.data.outputHandles)[0].dataType;
            const offsetInBytes = offsets[dataType].splice(
                0,
                TYPE_SIZES[dataType]
            )[0];
            handleOffsetsMap.set(`${node.id} ${handleId}`, offsetInBytes);
        });
    });

    return { handleOffsetsMap, outputOffsetsMap };
};
