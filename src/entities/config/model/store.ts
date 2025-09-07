import { createWithEqualityFn } from "zustand/traditional";
import { TConfigStore } from "./type";

export const useConfigStore = createWithEqualityFn<TConfigStore>((set, _) => ({
    config: {
        scripts: [],
        instructions: [],
        setpoints: [],
        outputMatrix: [],
        inputMatrix: [],
        sms: "",
        smsWeb: "",
        phoneNumber: "",
        offsetsOsc: [],
    },

    setConfig(newConfigData) {
        set((prev) => ({
            ...prev,
            config: { ...prev.config, ...newConfigData },
        }));
    },
}));
