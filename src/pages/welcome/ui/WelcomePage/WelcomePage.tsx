import { Auth } from "@/widgets/auth";
import { Fact } from "@/widgets/fact";
import { Header } from "@/shared/ui/header";
import { DemoMode } from "@/widgets/demoMode";
import styles from "./styles.module.css";
import PWABadge from "@/PWABadge";

export const WelcomePage = () => {
    return (
        <>
            <div className="container">
                <section className={styles["welcome-page"]}>
                    <Header />
                    <div className={styles["header-message"]}>
                        Добро пожаловать в наше приложение! Мы рады видеть вас
                        среди наших пользователей и хотим, чтобы ваше
                        взаимодействие с нашим сервисом было максимально
                        комфортным и приятным.
                    </div>
                    <Auth />
                    <Fact />
                    <DemoMode />
                </section>
            </div>
            <PWABadge />
        </>
    );
};
