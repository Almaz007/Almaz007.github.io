import { ChangeEvent, useState } from "react";

import { splitFloatToBytes, splitIntToBytes } from "../helpers/convertBytes";
import { TDataType } from "@/shared/types";
import { useSetpoints } from "../model/store";
import { getValueByOfffset } from "../helpers/geeValueByOffset";
import { isValidFloat, isValidInt } from "../helpers/validators";

export const useUpdateSetpointValue = (dataType: TDataType, offset: number) => {
    const initial = getValueByOfffset(dataType, offset);
    const [inputValue, setInputValue] = useState<string>(
        typeof initial === "number" ? String(initial) : ""
    );

    const [setpointsValues, setSetpoints] = useSetpoints((state) => [
        state.setpointsValues,
        state.setSetpoints,
    ]);

    const updateSetpoints = (bytes: Uint8Array) => {
        const newSetpoints = [...setpointsValues];
        newSetpoints.splice(offset, 4, ...bytes);
        setSetpoints(newSetpoints);
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;

        switch (dataType) {
            case "int":
                if (isValidInt(value)) {
                    const num = Number(value);
                    if (!Number.isNaN(num)) {
                        updateSetpoints(splitIntToBytes(num));
                        setInputValue(value);
                    }
                }
                break;

            case "float":
                if (isValidFloat(value)) {
                    value = value.replace(",", ".");
                    const num = Number(value);
                    if (!Number.isNaN(num)) {
                        updateSetpoints(splitFloatToBytes(num));
                        setInputValue(value);
                    }
                }
                break;

            case "bool":
                const checked = event.target.checked;
                const byte = checked ? 1 : 0;

                const newSetpoints = [...setpointsValues];
                newSetpoints[offset] = byte;
                setSetpoints(newSetpoints);
                setInputValue(String(byte));
                break;
        }
    };
    const handleFourierGarmonicForOutput = (
        outNumber: number,
        value: string
    ) => {
        if (isValidInt(value)) {
            const num = Number(value);
            if (!Number.isNaN(num) && num >= 1 && num <= 3) {
                const newSetpoints = [...setpointsValues];
                newSetpoints[outNumber] = num;
                setSetpoints(newSetpoints);
                setInputValue(value);
            }
        }
    };

    return { handleChange, inputValue, handleFourierGarmonicForOutput };
};
