import { InstructionConfig } from "@/entities/editor";

export const generateNewBufferData = (
    instructionData: InstructionConfig,
    offsets: number[],
    lastLength: number
) => {
    if (!offsets.length) {
        return {
            newPrimitiveData: {
                lengthInBytes: instructionData.lengthInBytes,
                offset: 1,
            },
            newOffset: 1,
            lastLength: instructionData.lengthInBytes,
        };
    }

    const newOffset = offsets.slice(-1)[0] + lastLength;
    const newPrimitiveData = {
        lengthInBytes: instructionData.lengthInBytes,
        offset: newOffset,
    };

    return {
        newOffset,
        newPrimitiveData,
        lastLength: instructionData.lengthInBytes,
    };
};
