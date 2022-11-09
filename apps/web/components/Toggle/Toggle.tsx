import { useRef } from "react";

import styles from "./Toggle.module.css";

import type { ToggleProps } from "./types";

const Toggle = ({ id, toggled, onChange, disabled, name }: ToggleProps) => {
  const ref = useRef(null);

  const onClick = async (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <>
      <input
        ref={ref}
        id={id}
        type="checkbox"
        name={name}
        onChange={onClick}
        className={styles.hidden}
        checked={toggled}
      />

      <label
        className={styles.container}
        htmlFor={id}
        onClick={() => ref?.current?.click()}
      >
        <span className={styles.switch} />
      </label>
    </>
  );
};

export default Toggle;
