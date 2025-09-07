import { TOffsetOsc } from "@/shared/model/ofsset";

export type TConfig = {
    scripts: number[][];
    instructions: number[];
    setpoints: number[];
    outputMatrix: (0 | 1)[][];
    inputMatrix: (0 | 1)[][];
    sms: string;
    smsWeb: string;
    phoneNumber: string;
    offsetsOsc: TOffsetOsc[];
};

export type TConfigStore = {
    config: TConfig;
    setConfig: (newConfig: Partial<TConfig>) => void;
};
