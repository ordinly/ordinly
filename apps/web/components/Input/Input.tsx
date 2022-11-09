import { useState, useRef } from "react";

import { Icon } from "@components/Icon";

import formatDate from "@util/formatDate";

import styles from "./Input.module.css";

import type { InputProps } from "./types";

const Input = ({
  id,
  value,
  onChange,
  onBlur,
  onFocus,
  onClick,
  disabled,
  error,
  size = "small",
  htmlType = "text",
  htmlTitle,
  mask,
  unmask,
  autocomplete,
  placeholder,
  readOnly,
  icon,
}: InputProps) => {
  const ref = useRef<HTMLInputElement>();
  const [componentId] = useState(id || Math.random().toString(32));
  const [hidden, setHidden] = useState(htmlType === "password" ? true : false);

  const toggleHidden = () => {
    setHidden(!hidden);
  };

  const onChangeValue = ({ target: { value } }) => {
    onChange(unmask ? unmask(value) : value);
  };

  const getValue = (value) => {
    let returnValue = value;

    if (htmlType === "date" && !isNaN(Date.parse(returnValue))) {
      returnValue = formatDate(returnValue as Date, "yyyy-MM-dd");
    }

    if (mask) {
      returnValue = mask(returnValue);
    }

    return returnValue;
  };

  return (
    <div className={styles.container} title={htmlTitle}>
      <input
        id={componentId}
        ref={ref}
        type={
          htmlType === "password" ? (hidden ? "password" : "text") : htmlType
        }
        placeholder={!readOnly ? placeholder : ""}
        value={getValue(value)}
        onChange={onChangeValue}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={readOnly || disabled}
        className={`${styles.input} ${styles[size]} ${
          error ? styles.error : ""
        } ${readOnly ? styles.readOnly : ""}`}
        autoComplete={autocomplete}
        onClick={onClick}
      ></input>

      {icon ? (
        <div
          className={styles.icon}
          onClick={() => {
            if (onClick) {
              onClick();
            }

            if (ref?.current) {
              ref.current.focus();
            }
          }}
        >
          <Icon icon={icon} size={12} />
        </div>
      ) : null}

      {htmlType === "password" && (
        <button className={styles.button} onClick={toggleHidden}>
          {hidden ? "Show" : "Hide"}
        </button>
      )}
    </div>
  );
};

export default Input;
