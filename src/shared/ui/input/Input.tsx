import { InputHTMLAttributes } from "react";
import styles from "./styles.module.css";
import cn from "classnames";
type InputProps = InputHTMLAttributes<HTMLInputElement>;
export const Input = ({
    value,
    placeholder,
    onChange,
    ...props
}: InputProps) => {
    return (
        <input
            {...props}
            className={cn(styles["input"], props.className)}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};
