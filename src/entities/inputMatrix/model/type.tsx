type TId = string;

export type TInputMatrix = {
    datas: Record<string, TInputMatrixRow>;
    setDatas: (newIndications: Record<TId, TInputMatrixRow>) => void;
};

export type TInputMatrixRow = {
    id: TId;
    name: string;
    I: 0 | 1;
    U: 0 | 1;
    HRM3: 0 | 1;
};
