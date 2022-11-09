import { Icon } from "@components/Icon";

import styles from "./ContentSwitcherItem.module.css";

import type {
  ContentSwitcherItemProps,
  InternalContentSwitcherItemProps,
} from "./types";

const ContentSwitcherItem = ({
  id,
  text,
  active,
  onClick,
  icon,
  value,
  size,
}: ContentSwitcherItemProps & InternalContentSwitcherItemProps) => {
  const onContentSwitcherItemClick = () => {
    onClick(value);
  };

  return (
    <button
      id={id}
      className={`${styles.item} ${active ? styles.active : ""} ${
        styles[size]
      }`}
      onClick={onContentSwitcherItemClick}
    >
      {icon ? (
        <div className={`${text ? styles.icon : ""}`}>
          <Icon icon={icon} />
        </div>
      ) : null}

      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default ContentSwitcherItem;
