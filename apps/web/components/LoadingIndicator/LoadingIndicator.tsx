import { LoadingIndicatorProps } from "./types";

import styles from "./LoadingIndicator.module.css";

const LoadingIndicator = ({ size = "small" }: LoadingIndicatorProps) => {
  return (
    <div className={`${styles.ring} ${styles[size]}`}>
      <div className={`${styles.inner} ${styles[size]}`} />
      <div className={`${styles.inner} ${styles[size]}`} />
      <div className={`${styles.inner} ${styles[size]}`} />
    </div>
  );
};

export default LoadingIndicator;
