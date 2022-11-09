import { CloseButton } from "@components/CloseButton";

import styles from "./Window.module.css";

const Window = ({ onClose, children, open }) => {
  return (
    <>
      <div className={`${styles.background} ${open ? styles.open : ""}`}>
        <div className={`${styles.container} ${open ? styles.open : ""}`}>
          <div>{children}</div>
        </div>

        <div className={styles.close}>
          <CloseButton id="close-calendar-window-button" onClick={onClose} />
        </div>
      </div>
    </>
  );
};

export default Window;
