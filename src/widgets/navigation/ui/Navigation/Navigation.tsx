import { routes } from "@/shared/router";
import { NavLink } from "react-router";
import styles from "./styles.module.css";
import cn from "classnames";

export const Navigation = ({}) => {
    return (
        <div>
            <div className={styles["link-row"]}>
                {routes.map((route, index) => (
                    <NavLink
                        key={index}
                        to={route.path}
                        className={({ isActive }) =>
                            cn(styles["link"], { [styles["active"]]: isActive })
                        }
                    >
                        {route.text}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};
