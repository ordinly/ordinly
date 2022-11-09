import { useState } from "react";

import { Select } from "@components/Select";
import { Button } from "@components/Button";
import { ListItem } from "@components/List";

import styles from "./SelectList.module.css";

import type { SelectListProps } from "./types";

const SelectList = ({
  id,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled,
  touched,
  options,
  menuOffset = { x: 0, y: 0 },
}: SelectListProps) => {
  const [componentId] = useState(id || Math.random().toString(32));

  const onAddNew = (newInputValue) => {
    if (newInputValue) {
      onChange([...value, newInputValue]);
    }
  };

  const onRemove = (index) => {
    const temp = [...value];

    temp.splice(index, 1);

    onChange(temp);
  };

  return (
    <div id={componentId}>
      <ul className={styles.list}>
        {value &&
          value?.map((item, index) => (
            <ListItem
              key={`${item}-${index}`}
              text={
                // Being filtered out, need to keep array ion original form
                options?.find(({ value: current }) => current === item)?.label
              }
              onRemove={onRemove}
              index={index}
              hideActions={disabled}
            />
          ))}
      </ul>

      {!disabled ? (
        <div className={styles.inputContainer}>
          <span className={styles.input}>
            <Select
              id={`${componentId}-select`}
              value={null}
              onChange={onAddNew}
              onBlur={onBlur}
              onFocus={onFocus}
              disabled={disabled}
              options={
                options?.reduce((total, current) => {
                  if (!value.includes(current.value)) {
                    return [...total, current];
                  } else {
                    return total;
                  }
                }, []) || []
              }
              menuOffset={menuOffset}
              clearable={true}
            />
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default SelectList;
