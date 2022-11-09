import styles from "./Grid.module.css";

import type { GridProps } from "./types";

const Grid = ({ noItemsText, noItemsIcon, children }: GridProps) => {
  return (
    <>
      {children ? (
        <div className={styles.grid}>{children}</div>
      ) : (
        <div className={styles.noItemsContainer}>
          {noItemsIcon}
          {noItemsText}
        </div>
      )}
    </>
  );
};

export default Grid;
