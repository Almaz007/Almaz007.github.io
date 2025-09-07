import { ListItem } from "../ListItem/ListItem";
import styles from "./styles.module.css";
import { TViewConfig, TNodeInstructionsTypes } from "@/entities/editor";

interface Props {
    views: TViewConfig;
}

export const NodesList = ({ views }: Props) => {
    return (
        <div className={styles["elements"]}>
            {Object.entries(views).map((view) => (
                <ListItem
                    key={view[0]}
                    viewData={view[1]}
                    type={view[0] as TNodeInstructionsTypes}
                />
            ))}
        </div>
    );
};
