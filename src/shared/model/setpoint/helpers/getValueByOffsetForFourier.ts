import { useSetpoints } from "@/shared/model/setpoint";

export const getValueByOffsetForFourier = (offset: number) => {
    const { setpointsValues } = useSetpoints.getState();

    return [...setpointsValues.slice(offset, offset + 4)];
};
