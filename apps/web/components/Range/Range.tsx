import { useState, useEffect } from "react";

import { Input } from "@components/Input";

import styles from "./Range.module.css";

import { RangeProps } from "./types";

const Range = ({
  id,
  value = [undefined, undefined],
  onChange,
  variant = "number",
}: RangeProps) => {
  const [current, setCurrent] = useState(value);

  const changeMin = (newValue) => {
    setCurrent([newValue, current[1]]);
  };

  const changeMax = (newValue) => {
    setCurrent([current[0], newValue]);
  };

  useEffect(() => {
    onChange(current);
  }, [current]);

  return (
    <div id={id} className={styles.container}>
      <div className={styles.component}>
        <Input
          value={current[0]}
          onChange={changeMin}
          htmlType={variant}
          placeholder="Min."
        />
      </div>

      <div className={styles.component}>
        <Input
          value={current[1]}
          onChange={changeMax}
          htmlType={variant}
          placeholder="Max."
        />
      </div>
    </div>
  );
};

export default Range;
