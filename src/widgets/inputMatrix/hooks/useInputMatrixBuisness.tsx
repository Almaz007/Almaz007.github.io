import { useEditorStore } from "@/entities/editor";
import { TInputMatrixRow, useInputMatrixStore } from "@/entities/inputMatrix";
import { getKeysByObj } from "@/shared/helpers";
import { useEffect, useMemo } from "react";
import { shallow } from "zustand/shallow";
import { NameField } from "../ui/NameField/NameField";
import { Checkbox } from "@/shared/ui";

const DEFAULT_COLUMNS: Omit<TInputMatrixRow, "id" | "name"> = {
    I: 0,
    U: 0,
    HRM3: 0,
};
const NON_INTERACTIVE_FIELDS = ["id", "name"];

export const useInputMatrixBuisness = () => {
    const { datas, setDatas } = useInputMatrixStore(
        (state) => ({
            datas: state.datas,
            setDatas: state.setDatas,
        }),
        shallow
    );

    const nodes = useEditorStore((state) => state.nodes, shallow);

    useEffect(() => {
        const inputs = nodes.filter((node) =>
            node?.data?.type?.toLowerCase().includes("input")
        );

        const newDatas = inputs.reduce<Record<string, TInputMatrixRow>>(
            (acc, input) => {
                acc[input.id] = {
                    ...(datas[input.id] ?? DEFAULT_COLUMNS),
                    id: input.id,
                    name: input.data.name ?? "",
                };
                return acc;
            },
            {}
        );

        setDatas(newDatas);
    }, [nodes]);

    const rows = useMemo(() => Object.values(datas), [datas]);

    const headers = useMemo(
        () =>
            getKeysByObj<TInputMatrixRow>({
                id: "",
                name: "",
                ...DEFAULT_COLUMNS,
            }),
        []
    );

    const renderHead = () =>
        headers.map((header) => <th key={header}>{header}</th>);

    const toggleField = (
        id: string,
        field: Exclude<keyof TInputMatrixRow, "id" | "name">
    ) => {
        const current = datas[id];

        // Если уже активно какое-то поле и это не оно — ничего не делаем
        const isAnotherActive = Object.entries(current).some(
            ([key, value]) =>
                key !== field &&
                !NON_INTERACTIVE_FIELDS.includes(key) &&
                value === 1
        );

        // Разрешаем только сброс текущего активного поля
        if (isAnotherActive && current[field] === 0) return;

        setDatas({
            ...datas,
            [id]: {
                ...current,
                [field]: current[field] ? 0 : 1,
            },
        });
    };

    const handleClick = (id: string, field: keyof TInputMatrixRow) => {
        if (NON_INTERACTIVE_FIELDS.includes(field)) return;
        toggleField(id, field as Exclude<keyof TInputMatrixRow, "id" | "name">);
    };

    const renderRow = (row: TInputMatrixRow) => (
        <>
            {headers.map((field) => {
                const isInteractive = !NON_INTERACTIVE_FIELDS.includes(
                    field as any
                );
                return (
                    <td
                        key={field}
                        style={{
                            cursor: isInteractive ? "pointer" : "default",
                        }}
                    >
                        {field === "name" ? (
                            <NameField value={row.name} id={row.id} />
                        ) : isInteractive ? (
                            <Checkbox
                                checked={!!row[field]}
                                onChange={() => handleClick(row.id, field)}
                            />
                        ) : (
                            row[field]
                        )}
                    </td>
                );
            })}
        </>
    );

    return { renderHead, renderRow, rows };
};
