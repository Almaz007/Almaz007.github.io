import { TRouteItem } from "@/shared/types";
import cn from "classnames";
import { NavLink } from "react-router";
import styles from "./styles.module.css";
import { useSidebarMenuStore } from "../../model/store";
import { shallow } from "zustand/shallow";

type Props = TRouteItem & {
    handleClick: () => void;
};

export const SidebarLink = ({ path, text, icon, handleClick }: Props) => {
    const [sidebarVisible] = useSidebarMenuStore(
        (state) => [state.sidebarVisible],
        shallow
    );

    const Icon = icon;
    return (
        <li
            className={cn(styles["nav__li"], {
                [styles["close"]]: !sidebarVisible,
            })}
            onClick={handleClick}
        >
            <div className={styles["link__row"]}>
                <NavLink
                    to={path}
                    className={({ isActive }) =>
                        cn(styles["link"], { [styles["active"]]: isActive })
                    }
                >
                    <div className={styles["icon__block"]}>
                        <Icon />
                    </div>
                    <span
                        className={[styles["text"], styles["nav-text"]].join(
                            " "
                        )}
                    >
                        {text}
                    </span>
                </NavLink>
            </div>
            {!sidebarVisible && (
                <span className={cn(styles["tooltip"])}>
                    <div className={styles["links"]}>{text}</div>
                </span>
            )}
        </li>
    );
};
