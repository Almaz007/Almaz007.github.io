import styles from "./styles.module.css";
import { FactIcon } from "@/shared/ui";

export const Fact = () => {
  return (
    <div className={styles["fact-block"]}>
      <div className={styles["title-row"]}>
        <div className={styles["icon"]}>
          <FactIcon />
        </div>
        <div className={styles["text"]}>Интересный факт</div>
      </div>
      <div className={styles["desc"]}>
        Первая служба РЗА была образована в УСЭ (Ленэнерго). Приказом от 4
        октября 1928 года первым заведующим релейной был назначен Прилуцкий Иван
        Иванович. В то время в службе работали Рыжков П. И., Иванов В. И., автор
        первой в СССР книги по релейной защите (1931 г.)
      </div>
    </div>
  );
};
