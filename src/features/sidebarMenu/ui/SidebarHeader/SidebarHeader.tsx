import styles from "./styles.module.css";
import cn from "classnames";

interface Props {
    sidebarVisible: Boolean;
}
export default function SidebarHeader({ sidebarVisible }: Props) {
    return (
        <header className={sidebarVisible ? styles["visible"] : ""}>
            <div className={styles["profile"]}>
                <div className={styles["image"]}>
                    {sidebarVisible ? (
                        <img
                            src="/headerLogoFull.png"
                            alt="avatar"
                            className={cn(styles["imgFull"], {
                                [styles["invisible"]]: !sidebarVisible,
                            })}
                        />
                    ) : (
                        <img
                            src="/headerLogoMini.jpg"
                            alt="avatar"
                            className={cn(styles["imgMini"], {
                                [styles["invisible"]]: sidebarVisible,
                            })}
                        />
                    )}
                </div>
                {/* <div className={styles['profile-text']}>PromEnergo</div> */}
            </div>
        </header>
    );
}
