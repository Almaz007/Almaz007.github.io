import styles from "./styles.module.css";

export const ArchitecturalProject = () => {
    return (
        <div className={styles["project"]}>
            <div className={styles["time"]}>Текущее время</div>
            <div className={styles["img__block"]}>
                <img src="/public/device.jpg" alt="device" />
            </div>
            <div className={styles["name-device"]}>
                Полное наименование устройства
            </div>
            <div className={styles["user-custon-name"]}>
                Пользовательское наименование
            </div>

            <div className={styles["work-mode"]}>
                <div className={styles["title-mode"]}>Режим работы</div>
                <div className={styles["actions"]}></div>
            </div>
            <div className={styles["journal"]}>Журнал коротких событий</div>
        </div>
    );
};
