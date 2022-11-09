import styles from "./Notification.module.css";

import { NotificationProps } from "./types";

const Notification = ({
  title,
  message,
  variant,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: NotificationProps) => {
  return (
    <div
      className={`${styles.notificationContainer} ${styles[variant]}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.message}>{message}</p>
      </div>

      <button onClick={onClose} className={styles.closeButton}>
        X
      </button>
    </div>
  );
};

export default Notification;
