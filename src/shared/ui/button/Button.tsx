import { ButtonHTMLAttributes } from "react";
import cn from "classnames";

import styles from "./styles.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type Props = {
    text: string;
} & ButtonProps;

export const Button = ({
    text,
    type = "button",
    disabled,
    className = "",
    ...props
}: Props) => {
    return (
        <button
            type={type}
            className={cn(
                styles["btn"],
                "nodrag",
                {
                    [styles["disabled"]]: disabled,
                },
                className
            )}
            {...props}
        >
            {text}
        </button>
    );
};
