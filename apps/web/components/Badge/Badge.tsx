import { Icon } from "@components/Icon";

import { BadgeProps } from "./types";

import styles from "./Badge.module.css";

const Badge = ({
  variant = "primary",
  number,
  icon,
  children,
  visible,
}: BadgeProps) => {
  return (
    <div className={styles.container}>
      {visible ? (
        <div
          className={`${styles.badge} ${styles[variant]} ${
            number ? styles.padded : ""
          }`}
        >
          {number ? number : icon ? <Icon icon={icon} /> : null}
        </div>
      ) : null}

      {children}
    </div>
  );
};

export default Badge;
