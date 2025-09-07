import { DropDownList, PopupMenu } from "@/shared/ui";
import { NodesList } from "../NodesList/NodesList";
import {
    logicViews,
    inputViews,
    comparisonsViews,
    outputViews,
    algebraicViews,
    timeExposuresViews,
    FourierViews,
    FifoViews,
} from "@/entities/editor";

export const LibNodes = () => {
    return (
        <div>
            <PopupMenu text={"Библиотека"} position="right">
                <DropDownList name="Входы и выходы">
                    <NodesList views={{ ...inputViews, ...outputViews }} />
                </DropDownList>
                <DropDownList name="Логические элементы">
                    <NodesList views={logicViews} />
                </DropDownList>
                <DropDownList name="Алгебраические операции">
                    <NodesList views={algebraicViews} />
                </DropDownList>
                <DropDownList name="Операции сравнения">
                    <NodesList views={comparisonsViews} />
                </DropDownList>
                <DropDownList name="Выдержки времени">
                    <NodesList views={timeExposuresViews} />
                </DropDownList>
                <DropDownList name="Фурье">
                    <NodesList views={FourierViews} />
                </DropDownList>
                <DropDownList name="Fifo">
                    <NodesList views={FifoViews} />
                </DropDownList>
            </PopupMenu>
        </div>
    );
};
