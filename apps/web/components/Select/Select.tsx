import { useState } from "react";

import { Menu } from "@components/Menu";
import { Button } from "@components/Button";
import { Icon } from "@components/Icon";

import styles from "./Select.module.css";

import type { SelectProps } from "./types";

const Select = ({
  id,
  options,
  onChange,
  onBlur,
  onFocus,
  onClick,
  value,
  size = "small",
  error,
  disabled,
  placeholder,
  menuOffset = { x: 0, y: 0 },
  clearable = false,
}: SelectProps) => {
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    if (!disabled) {
      setOpen(true);
    }
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const onSelection = (value) => {
    if (!disabled) {
      onChange(value);
    }
  };

  const onClear = () => {
    if (!disabled) {
      onChange(null);
    }
  };

  return (
    <>
      <div
        id={id}
        onClick={() => {
          if (onClick) {
            onClick();
          }

          openMenu();
        }}
        className={`${styles.select} ${styles[size]} ${
          disabled ? styles.disabled : ""
        } ${error ? styles.error : ""}`}
        tabIndex={disabled ? -1 : 0}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyPress={({ key }) => {
          if (key === "Enter") {
            openMenu();
          }
        }}
      >
        {value
          ? options?.find(({ value: optionValue }) => optionValue === value)
              ?.label
          : placeholder}

        <div className={`${styles.icon}`}>
          {value && clearable ? (
            <div className={`${styles.close}`} onClick={onClear}>
              <Icon icon="close" />
            </div>
          ) : null}

          <div className={`${open ? styles.flipped : ""}`}>
            <Icon icon="caret-down" size={12} />
          </div>
        </div>
      </div>

      {open ? (
        <Menu
          id={`${id}-menu`}
          mountId={id}
          onClose={closeMenu}
          align="center"
          position="bottom"
          fluid
          focusOnOpen
          xOffset={menuOffset.x}
          yOffset={menuOffset.y}
        >
          {options?.length ? (
            options?.map(({ label, value: optionValue }, index) => (
              <p
                className={`${styles.option} ${
                  value === optionValue ? styles.active : ""
                }`}
                key={`${id}-option-${optionValue}`}
                id={`${id}-option-${optionValue}`}
                onClick={() => onSelection(optionValue)}
              >
                {label}
              </p>
            ))
          ) : (
            <div className={styles.noItemsContainer}>
              <Icon icon="empty-items" />
              <p className={styles.noItemsText}>No items</p>
            </div>
          )}
        </Menu>
      ) : null}
    </>
  );
};

export default Select;
