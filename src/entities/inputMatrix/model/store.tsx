import { TInputMatrix } from "./type";
import { createWithEqualityFn } from "zustand/traditional";

export const useInputMatrixStore = createWithEqualityFn<TInputMatrix>(
    (set) => ({
        datas: {},
        setDatas(newDatas) {
            set({ datas: { ...newDatas } });
        },
    })
);
