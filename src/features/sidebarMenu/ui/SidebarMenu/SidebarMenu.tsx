import cn from "classnames";
import { useSidebarMenuStore } from "../../model/store";
import SidebarLinks from "../SidebarLinks/SidebarLinks";
import { Toggle } from "../Toggle/Toggle";
import styles from "./styles.module.css";
import SidebarHeader from "../SidebarHeader/SidebarHeader";

export const SidebarMenu = () => {
    const [sidebarVisible, setSidebarVisible] = useSidebarMenuStore((state) => [
        state.sidebarVisible,
        state.setSidebarVisible,
    ]);
    return (
        <nav
            className={cn(styles["menu"], {
                [styles["visible"]]: sidebarVisible,
            })}
        >
            <Toggle
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
            />
            <SidebarHeader sidebarVisible={sidebarVisible} />
            <SidebarLinks
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
            />
        </nav>
    );
};
