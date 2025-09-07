import styles from "./styles.module.css";
import cn from "classnames";
import { SidebarMenu, useSidebarMenuStore } from "@/features/sidebarMenu";
import { shallow } from "zustand/shallow";

export const Sidebar = () => {
    const [sidebarVisible, setSidebarVisible] = useSidebarMenuStore(
        (state) => [state.sidebarVisible, state.setSidebarVisible],
        shallow
    );

    return (
        <div
            className={cn(styles["sidebar"], {
                [styles["visible"]]: sidebarVisible,
            })}
        >
            <div
                className={styles["overlay"]}
                onClick={() => setSidebarVisible(false)}
            ></div>
            <SidebarMenu />
        </div>
    );
};
