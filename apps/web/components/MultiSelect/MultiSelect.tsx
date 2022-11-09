import { useState, useMemo } from "react";

import { Menu } from "@components/Menu";
import { Button } from "@components/Button";
import { Icon } from "@components/Icon";

import styles from "./MultiSelect.module.css";

import type { MultiSelectProps } from "./types";

const Select = ({
  id,
  options,
  onChange,
  onBlur,
  onFocus,
  value,
  size = "small",
  error,
  disabled,
  placeholder,
  menuOffset = { x: 0, y: 0 },
  clearable = false,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    if (!disabled) {
      setOpen(true);
    }
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const onSelection = (newValue) => {
    if (!disabled) {
      onChange([...(Array.isArray(value) ? value : [value]), newValue]);
    }
  };

  const onClear = () => {
    if (!disabled) {
      onChange([]);
    }
  };

  const unused = useMemo(
    () =>
      options?.reduce((total, { label, value: itemValue }) => {
        if (!value.includes(itemValue)) {
          return [
            ...total,
            <Button
              key={`${id}-option-${itemValue}`}
              id={`${id}-option-${itemValue}`}
              text={label}
              variant="ghost"
              onClick={() => onSelection(itemValue)}
              size="small"
              align="center"
            />,
          ];
        }

        return total;
      }, []),
    [options, value]
  );

  const used = useMemo(
    () =>
      options?.reduce((total, { label, value: itemValue }) => {
        if (value.includes(itemValue)) {
          return [
            ...total,
            <div className={styles.tag}>
              {label}

              <div
                className={styles.removeTag}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();

                  onChange(
                    (Array.isArray(value) ? value : [value]).filter(
                      (currentValue) => currentValue !== itemValue
                    )
                  );
                }}
              >
                <Icon icon="close" size={13} />
              </div>
            </div>,
          ];
        }

        return total;
      }, []),
    [options, value]
  );

  return (
    <>
      <div
        id={id}
        onClick={openMenu}
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
        {used?.length ? used : placeholder}

        <div className={`${styles.icon}`}>
          {value && clearable ? (
            <div className={`${styles.close}`} onClick={onClear}>
              <Icon icon="close" />
            </div>
          ) : null}

          <div className={`${open ? styles.flipped : ""}`}>
            <Icon icon="caret-down" />
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
          closeOnClick={false}
        >
          {unused?.length ? (
            unused
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
