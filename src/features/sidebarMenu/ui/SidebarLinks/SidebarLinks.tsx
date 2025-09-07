import { routes } from "@/shared/router";
import styles from "./styles.module.css";
import cn from "classnames";
import { SidebarLink } from "../SidebarLink/SidebarLink";
interface Props {
    sidebarVisible: boolean;
    setSidebarVisible: (sidebarVisible: boolean) => void;
}
export default function SidebarLinks({
    sidebarVisible,
    setSidebarVisible,
}: Props) {
    return (
        <ul
            className={cn(styles["menu__links"], {
                [styles["visible"]]: sidebarVisible,
            })}
        >
            {routes.map((link) => (
                <SidebarLink
                    key={link.id}
                    path={link.path}
                    text={link.text}
                    icon={link.icon}
                    // links={link.links}
                    handleClick={() => setSidebarVisible(false)}
                />
            ))}
        </ul>
    );
}
