import { useState } from "react";

import styles from "./TextArea.module.css";

import type { TextAreaProps } from "./types";

const TextArea = ({
  id,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled,
  error,
  rows = 4,
}: TextAreaProps) => {
  const [componentId] = useState(id || Math.random().toString(32));

  return (
    <div className={styles.container}>
      <textarea
        id={componentId}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        rows={rows}
        className={`${styles.textArea} ${error ? styles.error : ""}`}
      ></textarea>
    </div>
  );
};

export default TextArea;
