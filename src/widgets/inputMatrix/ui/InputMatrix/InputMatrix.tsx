import { Table } from "@/shared/ui";
import { TInputMatrixRow } from "@/entities/inputMatrix";
import { useInputMatrixBuisness } from "../../hooks/useInputMatrixBuisness";

export const InputMatrix = () => {
    const { renderHead, renderRow, rows } = useInputMatrixBuisness();

    return (
        <div>
            <Table<TInputMatrixRow>
                renderRow={renderRow}
                renderHead={renderHead}
                rowItems={rows}
                getRowKey={(row: TInputMatrixRow) => row.id}
                maxWidth={1100}
            />
        </div>
    );
};
