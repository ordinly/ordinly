import { Icon } from "@components/Icon";

import styles from "./Pill.module.css";

import type { PillProps } from "./types";

const Pill = ({
  htmlTitle,
  text,
  icon,
  color,
  textColor,
  onClick,
  onRemove,
}: PillProps) => {
  return (
    <div
      className={styles.pill}
      title={htmlTitle}
      style={
        color || textColor
          ? { backgroundColor: color, color: textColor }
          : undefined
      }
      onClick={onClick}
    >
      {icon ? <Icon icon={icon} /> : undefined}

      <span className={styles.text}>{text}</span>

      {onRemove ? (
        <button className={styles.removeButton} onClick={onRemove}>
          <Icon icon="close" />
        </button>
      ) : undefined}
    </div>
  );
};

export default Pill;
