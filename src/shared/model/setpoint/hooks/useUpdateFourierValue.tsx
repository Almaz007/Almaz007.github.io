import { isValidInt } from "../helpers/validators";
import { useSetpoints } from "../model/store";
import { getValueByOffsetForFourier } from "../helpers/getValueByOffsetForFourier";

export const useUpdateFourierValue = (offset: number) => {
    const [setpointsValues, setSetpoints] = useSetpoints((state) => [
        state.setpointsValues,
        state.setSetpoints,
    ]);
    const inputsValue = getValueByOffsetForFourier(offset);

    const handleFourierGarmonicForOutput = (
        outNumber: number,
        value: string
    ) => {
        if (isValidInt(value)) {
            const num = Number(value);
            if (!Number.isNaN(num) && num >= 0 && num <= 19) {
                const newSetpoints = [...setpointsValues];
                newSetpoints[offset + outNumber] = num;
                setSetpoints(newSetpoints);
            }
        }
    };
    return { inputsValue, handleFourierGarmonicForOutput };
};
