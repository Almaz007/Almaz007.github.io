import styles from "./styles.module.css";

export const Header = () => {
    return (
        <header className={styles["header"]}>
            <div className={styles["header-row"]}>
                <div className={styles["logo"]}>
                    <img src="/public/logo.jpg" alt="logo" />
                </div>
                <div className={styles["text"]}>
                    <div className={styles["desc"]}>
                        Программный комлпекс для настройки устройств
                        производства ООО "ИНТ"
                    </div>
                    <h2 className={styles["name"]}>INT CONFIG</h2>
                </div>
                <div className={styles["profile-name"]}>Гость</div>
            </div>
        </header>
    );
};
