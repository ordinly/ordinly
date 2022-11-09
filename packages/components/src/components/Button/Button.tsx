import React, { useRef, useEffect } from "react";

import { useObserve } from "../../hooks/useObserve";

import { Icon } from "../../components/Icon";

//@ts-ignore
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

  useObserve(ref, (value: any) => {
    const [{ target }] = value;

    if (onResize) {
      onResize(target.getBoundingClientRect());
    }
  });

  const onEnter = (event: any) => {
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
          <Icon icon={icon} size={iconSize} />
        </span>
      ) : null}

      {text}
    </button>
  );
};

export default Button;
