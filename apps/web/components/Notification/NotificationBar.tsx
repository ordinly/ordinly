import { useContext } from "react";

import { Notification } from "./";

import NotificationContext from "@contexts/NotificationContext";

import styles from "./Notification.module.css";

const NotificationBar = () => {
  const { notifications, setNotifications } = useContext(NotificationContext);

  const closeNotification = (index) => {
    const newNotifications = [...notifications];

    newNotifications.splice(index, 1);

    setNotifications(newNotifications);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.notificationsContainer}>
        {notifications?.length
          ? notifications.map(
              (
                { title, message, variant, onMouseEnter, onMouseLeave },
                index
              ) => (
                <Notification
                  key={`${title}-${index}`}
                  title={title}
                  message={message}
                  variant={variant}
                  onClose={() => closeNotification(index)}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                />
              )
            )
          : null}
      </div>
    </div>
  );
};

export default NotificationBar;
