import { useEditorStore } from "@/entities/editor";
import {
    TOutputMatrixRow,
    useOutputMatrixStore,
} from "@/entities/outputMatrix";
import { useEffect, useMemo } from "react";
import { shallow } from "zustand/shallow";
import { getKeysByObj } from "@/shared/helpers";
import { Checkbox } from "@/shared/ui";
import { NameField } from "../ui/NameField/NameField";

// Константы вынесены в отдельный объект
const DEFAULT_INDICATION: Omit<TOutputMatrixRow, "id" | "name"> = {
    led1: 0,
    led2: 0,
    led3: 0,
    blOn: 0,
    blOff: 0,
    sms: 0,
    smsWeb: 0,
};

const NON_INTERACTIVE_FIELDS = ["id", "name"];

export const useOutputMatrixBusiness = () => {
    const {
        smsText,
        setSms,
        smsWebText,
        setSmsWeb,
        indications,
        setIndications,
        phoneNumber,
        setPhoneNumber,
    } = useOutputMatrixStore(
        (state) => ({
            indications: state.indications,
            setIndications: state.setIndications,
            smsText: state.smsText,
            setSms: state.setSms,
            smsWebText: state.smsWebText,
            setSmsWeb: state.setSmsWeb,
            phoneNumber: state.phoneNumber,
            setPhoneNumber: state.setPhoneNumber,
        }),
        shallow
    );

    const nodes = useEditorStore((state) => state.nodes, shallow);

    useEffect(() => {
        const outputs = nodes.filter((node) =>
            node?.data?.type?.toLowerCase().includes("output")
        );

        const newIndications = outputs.reduce<Record<string, TOutputMatrixRow>>(
            (acc, output) => {
                acc[output.id] = {
                    ...(indications[output.id] ?? DEFAULT_INDICATION),
                    id: output.id,
                    name: output.data.name ?? "",
                };
                return acc;
            },
            {}
        );

        setIndications(newIndications);
    }, [nodes]);

    const rows = useMemo(() => Object.values(indications), [indications]);

    const toggleField = (
        id: string,
        field: Exclude<keyof TOutputMatrixRow, "id" | "name">
    ) => {
        const current = indications[id];
        const existing = Object.entries(indications).find(
            ([_, value]) => value[field] === 1
        );

        if (existing && existing[0] !== id) return;

        setIndications({
            ...indications,
            [id]: {
                ...current,
                [field]: current[field] ? 0 : 1,
            },
        });
    };

    const handleClick = (id: string, field: keyof TOutputMatrixRow) => {
        if (NON_INTERACTIVE_FIELDS.includes(field)) return;
        toggleField(
            id,
            field as Exclude<keyof TOutputMatrixRow, "id" | "name">
        );
    };

    const headers = useMemo(
        () =>
            getKeysByObj<TOutputMatrixRow>({
                id: "",
                name: "",
                ...DEFAULT_INDICATION,
            }),
        []
    );

    const renderHead = () =>
        headers.map((header) => <th key={header}>{header}</th>);

    const renderRow = (row: TOutputMatrixRow) => (
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

    return {
        renderHead,
        renderRow,
        rows,
        smsText,
        setSms,
        smsWebText,
        setSmsWeb,
        phoneNumber,
        setPhoneNumber,
    };
};
