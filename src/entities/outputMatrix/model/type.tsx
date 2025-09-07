type TId = string;

export type TOutputMatrix = {
    setSms: (text: string) => void;
    setSmsWeb: (text: string) => void;
    smsText: string;
    smsWebText: string;
    phoneNumber: string;
    setPhoneNumber: (newPhoneNumber: string) => void;
    indications: Record<string, TOutputMatrixRow>;
    setIndications: (newIndications: Record<TId, TOutputMatrixRow>) => void;
};

export type TOutputMatrixRow = {
    id: TId;
    name: string;
    led1: 0 | 1;
    led2: 0 | 1;
    led3: 0 | 1;
    blOn: 0 | 1;
    blOff: 0 | 1;
    sms: 0 | 1;
    smsWeb: 0 | 1;
};
