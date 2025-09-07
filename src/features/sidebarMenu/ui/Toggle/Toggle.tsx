import { FaChevronRight } from "react-icons/fa";
import styles from "./styles.module.css";
interface Props {
    sidebarVisible: boolean;
    setSidebarVisible: (sidebarVisible: boolean) => void;
}

export const Toggle = ({ sidebarVisible, setSidebarVisible }: Props) => {
    const changeToggle = () => {
        setSidebarVisible(!sidebarVisible);
    };
    return (
        <div className={styles["toggle"]} onClick={changeToggle}>
            <FaChevronRight />
        </div>
    );
};
