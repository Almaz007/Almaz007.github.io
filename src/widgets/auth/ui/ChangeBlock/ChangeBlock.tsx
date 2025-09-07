import styles from "./styles.module.css";
import { FormT } from "../../model/intefaces";
import cn from "classnames";

interface Props {
  formType: FormT;
  setFormType: (type: FormT) => void;
}

export const ChangeBlock = ({ formType, setFormType }: Props) => {
  return (
    <div className={styles["change-block"]}>
      <div className={styles["change-btns"]}>
        <button
          onClick={() => {
            setFormType("login");
          }}
          className={cn(styles["change-btn"], {
            [styles["active"]]: formType === "login",
          })}
        >
          авторизация
        </button>
        <button
          onClick={() => {
            setFormType("registration");
          }}
          className={cn(styles["change-btn"], {
            [styles["active"]]: formType === "registration",
          })}
        >
          регистрация
        </button>
      </div>
    </div>
  );
};
