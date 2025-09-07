import { useState } from "react";
import { Login, Registration } from "@/features/auth";
import { FormT } from "../../model/intefaces";
import styles from "./styles.module.css";
import { ChangeBlock } from "../ChangeBlock/ChangeBlock";

export const Auth = () => {
  const [formType, setFormType] = useState<FormT>("login");

  return (
    <div className={styles["auth"]}>
      <div className={styles["title"]}>
        {formType === "login" ? "Авторизация" : "Регистрация"}
      </div>
      <ChangeBlock formType={formType} setFormType={setFormType} />
      {formType === "login" ? <Login /> : <Registration />}
    </div>
  );
};
