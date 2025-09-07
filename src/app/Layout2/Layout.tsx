import { Header } from "@/shared/ui";
import { Outlet } from "react-router";
import styles from "./styles.module.css";
import { ArchitecturalProject } from "@/widgets/architecturalProject/ui/ArchitecturalProject/ArchitecturalProject";
import { Navigation } from "@/widgets/navigation";
import PWABadge from "@/PWABadge";
export const Layout = ({}) => {
    return (
        <>
            <div className={styles["layout"]}>
                <Header />
                <div className={styles["row"]}>
                    <ArchitecturalProject />
                    <div className={styles["content"]}>
                        <Navigation />
                        <div className={styles["pages"]}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <PWABadge />
        </>
    );
};
