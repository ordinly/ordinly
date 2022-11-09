import { Tab } from "./Tab";

import styles from "./Tabs.module.css";

import type { TabsProps } from "./types";

const Tabs = ({ id, tabs, value, onChange }: TabsProps) => {
  const onClick = (newTabId) => {
    onChange(newTabId);
  };

  return (
    <div id={id} className={styles.tabs}>
      {tabs?.map(({ id: tabId, text, disabled, icon, error }) => (
        <Tab
          key={tabId}
          id={tabId}
          active={value === tabId}
          text={text}
          onClick={onClick}
          disabled={disabled}
          icon={icon}
          error={error}
        />
      ))}
    </div>
  );
};

export default Tabs;
