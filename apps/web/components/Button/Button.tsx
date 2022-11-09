import { useRef, forwardRef, useEffect } from "react";

import useObserve from "@hooks/useObserve";

import { Icon } from "@components/Icon";

import styles from "./Button.module.css";

import type { ButtonProps } from "./types";

const Button = ({
  id,
  onClick,
  disabled,
  variant = "primary",
  size = "small",
  text,
  danger = false,
  icon,
  onResize,
  htmlTitle,
  align = "left",
  type = "button",
  fluid = true,
  wrap = true,
  iconSize = 12,
}: ButtonProps) => {
  const ref = useRef(null);

  useObserve(ref, (value) => {
    const [{ target }] = value;

    if (onResize) {
      onResize(target.getBoundingClientRect());
    }
  });

  const onEnter = (event) => {
    if (event.key === "Enter") {
      //onClick();
    }
  };

  useEffect(() => {
    if (type === "submit") {
      document.addEventListener("keyup", onEnter);

      return () => document.removeEventListener("keyup", onEnter);
    }
  }, []);

  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[align]}  ${styles[size]} ${
        styles[variant]
      } ${danger ? styles.danger : ""} ${wrap ? "" : styles.wrap} ${
        fluid ? styles.fluid : ""
      }`}
      ref={ref}
      title={htmlTitle}
      type="button"
    >
      {icon ? (
        <span className={`${styles.icon} ${!text ? styles.noText : ""}`}>
          {typeof icon === "string" ? (
            <Icon icon={icon} size={iconSize} />
          ) : (
            icon({})
          )}
        </span>
      ) : null}

      {text}
    </button>
  );
};

export default Button;
