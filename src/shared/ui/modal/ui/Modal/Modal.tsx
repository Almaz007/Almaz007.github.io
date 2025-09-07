import React from "react";
import styles from "./styles.module.css";
import cn from "classnames";
import ReactDOM from "react-dom";

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: React.ReactElement;
}

export const Modal = ({ visible, setVisible, children }: Props) => {
  const handleContentClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div
      className={cn(styles["wrapper"], {
        [styles["visible"]]: visible,
      })}
      onClick={() => {
        setVisible(false);
      }}
    >
      <div className={styles["content"]} onClick={handleContentClick}>
        {children}
      </div>
    </div>,
    document.getElementById("root-main")!
  );
};
