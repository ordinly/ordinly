import { ContentSwitcherItem } from "./Item";

import styles from "./ContentSwitcher.module.css";

import type { ContentSwitcherProps } from "./types";

const ContentSwitcher = ({
  id,
  items,
  value,
  onChange,
  size = "medium",
}: ContentSwitcherProps) => {
  const onClick = (newValue) => {
    onChange(newValue);
  };

  return (
    <div id={id} className={styles.contentSwitcher}>
      {items?.map(({ id: tabId, text, disabled, icon, value: itemValue }) => (
        <ContentSwitcherItem
          key={tabId}
          id={tabId}
          active={value === itemValue}
          text={text}
          onClick={onClick}
          disabled={disabled}
          icon={icon}
          value={itemValue}
          size={size}
        />
      ))}
    </div>
  );
};

export default ContentSwitcher;
