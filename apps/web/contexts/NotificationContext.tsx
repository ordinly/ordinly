import { useState, createContext } from "react";

const NotificationContext = createContext(null);

export default NotificationContext;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const notification = (newNotification) => {
    const notificationId = Math.random().toString(36);

    let timeout;

    const removeNotification = () =>
      setNotifications(
        notifications.filter(
          (current) => current.notificationId !== notificationId
        )
      );

    const onMouseEnter = () => clearTimeout(timeout);

    const onMouseLeave = () =>
      (timeout = setTimeout(() => removeNotification(), 2000));

    timeout = setTimeout(() => removeNotification(), 5000);

    setNotifications([
      ...notifications,
      { ...newNotification, onMouseEnter, onMouseLeave },
    ]);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications, notification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
