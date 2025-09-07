import { Button, Input } from "@/shared/ui";
import { ActionFactory } from "../model/types";
import { TNodeData } from "@/entities/editor";
import { TSetpointNodeData } from "@/entities/editor";
import { ChangeEvent } from "react";

export type TActionName =
    | "changeFourierGarmonics"
    | "invert"
    | "updateSetpointValue"
    | "updateName"
    | "delete"
    | "dublicate"
    | "updateLengthMemory";
// | "dublicate";

const isSetpointNodeData = (data: TNodeData): data is TSetpointNodeData => {
    return "setpointDataType" in data;
};

export const actionFactories: Record<TActionName, ActionFactory> = {
    delete: {
        key: "deleteNode",
        label: "delete node",
        dependencies: ["useDeleteNode"],
        createElement: ({ node, dependencies }) => {
            const { id: nodeId, data } = node;
            const info = dependencies.useDeleteNode?.();
            if (!info) return null;

            const { handleDelete } = info;
            return (
                <Button
                    text="Удалить"
                    onClick={() => handleDelete(nodeId, data)}
                />
            );
        },
    },
    dublicate: {
        key: "dublicate",
        label: "dublicate node",
        dependencies: ["useCopyPaste"],
        createElement: ({ node, dependencies }) => {
            const info = dependencies.useCopyPaste?.();
            if (!info) return null;

            const { createDublicate } = info;
            return (
                <Button
                    text="Дублировать"
                    onClick={() => createDublicate(node)}
                />
            );
        },
    },
    changeFourierGarmonics: {
        key: "invert",
        label: "Инвертировать",
        dependencies: ["useUpdateFourierValue"],
        createElement: ({ node, dependencies }) => {
            const { data } = node;
            if (!("setpointDataType" in data)) return;
            const { setpointOffset, outputHandles } = data;

            if (!dependencies?.useUpdateFourierValue) return null;
            const { handleFourierGarmonicForOutput, inputsValue } =
                dependencies?.useUpdateFourierValue(setpointOffset);

            const grouped = Object.values(outputHandles).reduce<any[][]>(
                (acc, value, index) => {
                    if (index % 2 === 0) {
                        acc.push([value]);
                    } else {
                        acc[acc.length - 1].push(value);
                    }
                    return acc;
                },
                []
            );
            return (
                <div
                    onDoubleClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="nodrag nopan nowheel"
                    style={{
                        display: "flex",
                        gap: "10px",
                        width: "max-content",
                    }}
                >
                    {grouped.map((_, index) => (
                        <Input
                            key={index}
                            style={{ width: "60px" }}
                            type="number"
                            min={0}
                            value={inputsValue[index]}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                handleFourierGarmonicForOutput(
                                    index,
                                    event.target.value
                                )
                            }
                        />
                    ))}
                </div>
            );
        },
    },

    invert: {
        key: "invert",
        label: "Инвертировать",
        dependencies: ["useInverseNode"],
        createElement: ({ node, dependencies }) => {
            const { id: nodeId, data } = node;
            const handleClick = dependencies.useInverseNode?.(
                nodeId,
                data.type
            );
            return (
                <Button
                    onClick={handleClick}
                    text="Инвертировать"
                    type="button"
                />
            );
        },
    },
    updateSetpointValue: {
        key: "updateSetpointValue",
        label: "Изменить значение",
        dependencies: ["useUpdateSetpointValue"],
        createElement: ({ node, dependencies }) => {
            const { data } = node;
            if (!isSetpointNodeData(data)) return null;
            const offset = data.setpointOffset;
            const dataType = data.setpointDataType;

            if (offset === null || offset === undefined) return null;

            const info = dependencies.useUpdateSetpointValue?.(
                dataType,
                offset
            );

            if (!info) return null;
            const { handleChange, inputValue } = info;

            return (
                <div className="flex flex-col gap-2">
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Введите значение"
                    />
                </div>
            );
        },
    },
    updateName: {
        key: "updateName",
        label: "Изменить значение",
        dependencies: ["useUpdateNameValue"],
        createElement: ({ node, dependencies }) => {
            const { id: nodeId, data } = node;
            const info = dependencies.useUpdateNameValue?.(nodeId, data);

            if (!info) return null;
            const { name, handleChangeName } = info;

            return (
                <div className="flex flex-col gap-2">
                    <Input
                        type="text"
                        value={name}
                        onChange={handleChangeName}
                        placeholder="Введите имя"
                    />
                </div>
            );
        },
    },
    updateLengthMemory: {
        key: "updateLengthMemory",
        label: "Изменить значение",
        dependencies: ["useChangeLengthMemory"],
        createElement: ({ node, dependencies }) => {
            const { id: nodeId, data } = node;
            const info = dependencies.useChangeLengthMemory?.(nodeId, data);

            if (!info) return null;
            const { lengthMemory, handleChangeLengthMemory } = info;

            return (
                <div
                    className="nodrag nopan nowheel"
                    onDoubleClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <Input
                        type="number"
                        min={1}
                        value={lengthMemory}
                        onChange={handleChangeLengthMemory}
                        placeholder="Введите глубину"
                    />
                </div>
            );
        },
    },
} satisfies Record<string, ActionFactory>;
