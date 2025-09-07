import { getTimeForTimeStamp } from "./getTimeForTimestamp";

export function getTimeString(
    timestamp: number,
    ppsFlag: number,
    subSeconds: number
) {
    if (timestamp === 0) return "не установлено";

    const baseTime = getTimeForTimeStamp(timestamp);
    return ppsFlag === 1
        ? `${baseTime}:${subSeconds.toFixed(3).slice(2)}`
        : baseTime;
}
