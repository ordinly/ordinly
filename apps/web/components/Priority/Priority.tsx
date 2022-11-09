import styles from "./Priority.module.css";

import type { PriorityProps } from "./types";

const priorityMapping = {
  Critical: "--critical-priority-color",
  High: "--high-priority-color",
  Medium: "--medium-priority-color",
  Low: "--low-priority-color",
};

const Priority = ({ variant }: PriorityProps) => {
  return (
    <div
      className={`${styles.tag}`}
      style={{
        color: `var(${priorityMapping[variant]})`,
        backgroundColor: `var(${priorityMapping[variant]}-background)`,
      }}
    >
      {variant}
    </div>
  );
};

export default Priority;
