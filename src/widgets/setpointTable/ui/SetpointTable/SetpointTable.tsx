import { Table } from "@/shared/ui";
import { useSetpointTableBusiness } from "../../hooks/useSetpointTableBusiness";
import { TSetpointTableRow } from "../../model/types";

type Props = {};
export const SetpointTable = ({}: Props) => {
    const { renderHead, rows, renderRow } = useSetpointTableBusiness();
    return (
        <div>
            <Table<TSetpointTableRow>
                rowItems={rows}
                renderHead={renderHead}
                renderRow={renderRow}
                getRowKey={(row: TSetpointTableRow) => row.id}
                maxWidth={1000}
            />
        </div>
    );
};
