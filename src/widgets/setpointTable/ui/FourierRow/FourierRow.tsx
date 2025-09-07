import { Input } from "@/shared/ui";
import { TSetpointTableRow } from "../../model/types";
import { NameField } from "../NameField/NameField";
import { useUpdateFourierValue } from "@/shared/model/setpoint/hooks/useUpdateFourierValue";
import { ChangeEvent } from "react";

export const FourierRow = ({ id, data }: TSetpointTableRow) => {
    const { type, setpointOffset, name, outputHandles } = data;
    const { handleFourierGarmonicForOutput, inputsValue } =
        useUpdateFourierValue(setpointOffset);

    const grouped = Object.values(outputHandles).reduce<any[][]>(
        (acc, value, index) => {
            if (index % 2 === 0) {
                acc.push([value]); // начинаем новую группу
            } else {
                acc[acc.length - 1].push(value); // добавляем ко второй паре
            }
            return acc;
        },
        []
    );

    return (
        <>
            <td key={0}>{id}</td>
            <td key={1}>{type}</td>
            <td key={2}>
                <NameField value={name ?? ""} id={id} />
            </td>
            <td key={3} style={{ display: "flex", gap: "10px" }}>
                {grouped.map((_, index) => (
                    <Input
                        key={index}
                        style={{ width: "60px" }}
                        type="number"
                        value={inputsValue[index]}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleFourierGarmonicForOutput(
                                index,
                                event.target.value
                            )
                        }
                    />
                ))}
            </td>
        </>
    );
};
