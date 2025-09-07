import { splitFloatToBytes, splitIntToBytes } from "../helpers/convertBytes";
import { TDataType } from "@/shared/types";
import { useSetpoints } from "../model/store";

export const useSetpointValues = () => {
    const [setpointsValues, setSetpoints] = useSetpoints((state) => [
        state.setpointsValues,
        state.setSetpoints,
    ]);

    const changeValueInt = (value: string, setpointOffset: number) => {
        // Разрешаем только числа
        if (/^-?\d*[]?\d*$/.test(value)) {
            const newSetpoints = [...setpointsValues];
            newSetpoints.splice(setpointOffset, 4, ...splitIntToBytes(+value));

            // setInputValue(value);
            setSetpoints([...newSetpoints]);
        }
    };

    const changeValueFloat = (value: string, setpointOffset: number) => {
        // Разрешаем только числа и десятичные разделители
        if (/^-?\d*[,.]?\d*$/.test(value)) {
            if (value.includes(",")) {
                value = value.replace(",", ".");
            }

            const newSetpoints = [...setpointsValues];
            newSetpoints.splice(
                setpointOffset,
                4,
                ...splitFloatToBytes(+value)
            );

            setSetpoints([...newSetpoints]);
        }
    };

    const changeValue = (
        value: string,
        setpointOffset: number,
        dataType: TDataType
    ) => {
        switch (dataType) {
            case "int": {
                changeValueInt(value, setpointOffset);
                return;
            }
            case "float": {
                changeValueFloat(value, setpointOffset);
            }
        }
    };

    return { setpointsValues, changeValue };
};
