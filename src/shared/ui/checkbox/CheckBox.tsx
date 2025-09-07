import { ChangeEvent, InputHTMLAttributes } from "react";
import styles from "./styles.module.css";
import { FaCheck } from "react-icons/fa"; // или замени на свой SVG
type CheckboxProps = {
    checked: boolean;
    label?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "checked">;

export const Checkbox = ({
    checked,
    onChange,
    label,
    ...rest
}: CheckboxProps) => {
    return (
        <label className={styles["wrapper"]}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className={styles["hiddenCheckbox"]}
                {...rest}
            />
            <div
                className={`${styles["customCheckbox"]} ${
                    checked ? styles["checked"] : ""
                }`}
            >
                <FaCheck className={styles["checkmark"]} />
            </div>
            {label && <span className={styles["labelText"]}>{label}</span>}
        </label>
    );
};
