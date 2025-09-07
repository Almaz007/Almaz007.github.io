import { TOutputMatrix } from "./type";
import { createWithEqualityFn } from "zustand/traditional";

export const useOutputMatrixStore = createWithEqualityFn<TOutputMatrix>(
    (set) => ({
        indications: {},
        setIndications(newIndications) {
            set({ indications: { ...newIndications } });
        },
        smsText: "",
        phoneNumber: "",
        setPhoneNumber(newPhoneNumber) {
            set({ phoneNumber: newPhoneNumber });
        },
        smsWebText: "",
        setSms(newText) {
            set({ smsText: newText });
        },
        setSmsWeb(newText) {
            set({ smsWebText: newText });
        },
    })
);
