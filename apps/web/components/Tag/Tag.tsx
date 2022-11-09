import styles from "./Tag.module.css";

import type { TagProps } from "./types";

const Tag = ({ id, label }: TagProps) => {
  return (
    <p id={id} className={styles.tag}>
      {label}
    </p>
  );
};

export default Tag;
