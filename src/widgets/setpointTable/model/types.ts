import { TSetpointNodeData } from "@/entities/editor";

export type TSetpointTableRow = {
    id: string;
    data: TSetpointNodeData;
};

export type TSetpointTableHead = {
    id: string;
    type: string;
    name: string;
    value: any;
};
