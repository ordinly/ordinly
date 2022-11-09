import { Icon } from "@components/Icon";

import styles from "./ProgressBar.module.css";

import type { ProgressBarProps } from "./types";

const ProgressBar = ({ percent }: ProgressBarProps) => {
  return (
    <div className={styles.circleWrap}>
      {percent === 100 ? (
        <div className={styles.complete}>
          <Icon icon="check" />
        </div>
      ) : (
        <div className={styles.circle}>
          <>
            <div
              className={`${styles.mask} ${styles.full}`}
              style={{ transform: `rotate(${180 * (percent / 100)}deg)` }}
            >
              <div
                className={styles.fill}
                style={{ transform: `rotate(${180 * (percent / 100)}deg)` }}
              ></div>
            </div>

            <div className={`${styles.mask} ${styles.half}`}>
              <div
                className={styles.fill}
                style={{ transform: `rotate(${180 * (percent / 100)}deg)` }}
              ></div>
            </div>

            <div className={styles.insideCircle}>{percent}%</div>
          </>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
