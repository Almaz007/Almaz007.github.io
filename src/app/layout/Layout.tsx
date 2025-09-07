import { Outlet } from "react-router";
import styles from "./styles.module.css";
import { Sidebar } from "@/widgets/sidebar";

export const Layout = () => {
    return (
        <div className={styles["layout"]}>
            <Sidebar />
            <main className={styles["main"]}>
                <Outlet />
            </main>
        </div>
    );
};
