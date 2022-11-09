import { Icon } from "@components/Icon";
import { Badge } from "@components/Badge";

import styles from "./Tab.module.css";

import type { TabProps, InternalTabProps } from "./types";

const Tab = ({
  id,
  text,
  active,
  onClick,
  icon,
  error,
}: TabProps & InternalTabProps) => {
  const onTabClick = () => {
    onClick(id);
  };

  return (
    <button
      id={id}
      className={`${styles.tab} ${active ? styles.active : ""} ${
        error ? styles.error : ""
      }`}
      onClick={onTabClick}
    >
      {icon ? (
        <div className={styles.icon}>
          <Icon icon={icon} />
        </div>
      ) : null}

      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default Tab;
