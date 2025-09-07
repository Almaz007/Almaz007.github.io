import styles from "./styles.module.css";
import cn from "classnames";

interface Props {
  onClick: (e: any) => void;
  direction: "left" | "right";
  disabled?: boolean;
}

export const Arrow = ({ onClick, direction, disabled }: Props) => {
  return (
    <svg
      onClick={onClick}
      className={cn(styles["arrow"], {
        [styles["disabled"]]: disabled,
      })}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {direction === "left" && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {direction === "right" && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
};
