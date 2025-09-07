import {
    TSetpointNodeData,
    TNodeData,
    useEditorStore,
} from "@/entities/editor";
import { TSetpointTableHead, TSetpointTableRow } from "../model/types";
import { getKeysByObj } from "@/shared/helpers";
import { useMemo } from "react";
import { shallow } from "zustand/shallow";
import { Node } from "@xyflow/react";
import { TableRow } from "../ui/tableRow/TableRow";
import { FourierRow } from "../ui/FourierRow/FourierRow";

const TABLE_HEADERS: TSetpointTableHead = {
    id: "",
    type: "",
    name: "",
    value: 0,
};

function isSetpointNode(
    node: Node<TNodeData>
): node is Node<TSetpointNodeData> {
    return "setpointOffset" in node.data;
}

export const useSetpointTableBusiness = () => {
    const nodes = useEditorStore((state) => state.nodes, shallow);

    const rows: TSetpointTableRow[] = useMemo(() => {
        const setpointNodes = nodes.filter((node) => isSetpointNode(node));

        return setpointNodes.map((node) => ({
            id: node.id,
            data: node.data,
        }));
    }, [nodes]);

    const renderHead = () => {
        return (
            <>
                {getKeysByObj<TSetpointTableHead>(TABLE_HEADERS).map((head) => (
                    <th key={head}>{head}</th>
                ))}
            </>
        );
    };

    const renderRow = (row: TSetpointTableRow) => {
        return row.data.type === "fourierInt" ? (
            <FourierRow id={row.id} data={row.data} />
        ) : (
            <TableRow id={row.id} data={row.data} />
        );
    };
    return { renderHead, rows, renderRow };
};
