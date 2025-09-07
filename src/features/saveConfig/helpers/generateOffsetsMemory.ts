import { TDataType } from "@/shared/types";
// import { typeSizes } from "../constants/constants";
export const typeSizes: Record<TDataType, number> = {
    bool: 1,
    int: 4,
    float: 4,
    analog: 160,
};
const ORDER: TDataType[] = ["bool", "int", "float", "analog"];

const alignUp = (n: number, size: number) =>
    size === 1 ? n : Math.ceil(n / 4) * 4;

const rangeBytes = (start: number, size: number) => {
    const out: number[] = [];
    for (let x = start; x < start + size; x++) out.push(x);
    return out;
};

const rangesOverlap = (a0: number, a1: number, b0: number, b1: number) =>
    a0 <= b1 && b0 <= a1;

const shiftArray = (arr: number[], delta: number) => arr.map((v) => v + delta);

export const generateOffsetsMemory = (
    type: TDataType,
    offsetsStore: Record<TDataType, number[]>,
    sizeByFifo?: number,
    typeSizes: Record<TDataType, number> = {
        bool: 1,
        int: 4,
        float: 4,
        analog: 160,
    }
) => {
    // const { offsetsByTypes, setOffsets } = useOffsets.getState();

    const sizeT = typeSizes[type];
    const idxT = ORDER.indexOf(type);

    const lastOf = (t: TDataType) =>
        offsetsStore[t].length
            ? offsetsStore[t][offsetsStore[t].length - 1]
            : null;

    let start = offsetsStore[type].length
        ? offsetsStore[type][offsetsStore[type].length - 1] + 1
        : 0;

    if (offsetsStore[type].length === 0) {
        for (let i = 0; i < idxT; i++) {
            const older = ORDER[i];
            const l = lastOf(older);
            if (l !== null) {
                start = Math.max(start, alignUp(l + 1, sizeT));
            }
        }
        start = alignUp(start, sizeT);
    }

    offsetsStore[type].push(...rangeBytes(start, sizeByFifo ?? sizeT));

    const pushForwardFrom = (srcIdx: number) => {
        const srcType = ORDER[srcIdx];
        const srcArr = offsetsStore[srcType];
        if (!srcArr.length) return;
        const srcStart = srcArr[0];
        const srcEnd = srcArr[srcArr.length - 1];

        for (let j = srcIdx + 1; j < ORDER.length; j++) {
            const otherType = ORDER[j];
            const otherArr = offsetsStore[otherType];
            if (!otherArr.length) continue;

            const oStart = otherArr[0];
            const oEnd = otherArr[otherArr.length - 1];

            if (rangesOverlap(srcStart, srcEnd, oStart, oEnd)) {
                const step = typeSizes[otherType];
                const newStart = alignUp(srcEnd + 1, step);
                const delta = newStart - oStart;

                offsetsStore[otherType] = shiftArray(otherArr, delta);

                pushForwardFrom(j);
                return;
            }
        }
    };

    pushForwardFrom(idxT);
};
