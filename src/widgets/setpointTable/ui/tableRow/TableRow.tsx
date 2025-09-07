import { Input } from "@/shared/ui";
import { TSetpointTableRow } from "../../model/types";
import { useUpdateSetpointValue } from "@/shared/model/setpoint";
import { NameField } from "../NameField/NameField";

export const TableRow = ({ id, data }: TSetpointTableRow) => {
    const { type, setpointOffset, name, setpointDataType: dataType } = data;
    const { handleChange, inputValue } = useUpdateSetpointValue(
        dataType,
        setpointOffset
    );
    data;
    return (
        <>
            <td key={0}>{id}</td>
            <td key={1}>{type}</td>
            <td key={2}>
                <NameField value={name ?? ""} id={id} />
            </td>
            <td key={3}>
                <Input type="text" value={inputValue} onChange={handleChange} />
            </td>
        </>
    );
};
