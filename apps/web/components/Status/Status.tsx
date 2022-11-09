import styles from "./Status.module.css";

import type { StatusProps } from "./types";

const statusMapping = {
  Proposal: "--proposal-status-color",
  "Not started": "--not-started-status-color",
  "On hold": "--on-hold-status-color",
  "In progress": "--in-progress-status-color",
  Complete: "--complete-status-color",
  Cancelled: "--cancelled-status-color",
  Rejected: "--rejected-status-color",
  Pending: "--pending-status-color",
  Active: "--active-status-color",
};

const Status = ({ variant }: StatusProps) => {
  return (
    <div
      className={`${styles.tag}`}
      style={{
        color: `var(${statusMapping[variant]})`,
        backgroundColor: `var(${statusMapping[variant]}-background)`,
      }}
    >
      {variant}
    </div>
  );
};

export default Status;
