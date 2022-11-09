import type { OnClickHandler } from "@components/types";

import type { IconType } from "@components/Icon";
import React from "react";

export type ButtonVariants =
  | "ghost"
  | "primary"
  | "secondary"
  | "danger"
  | "outline"
  | "success";

export type ButtonSizes = "large" | "medium" | "small" | "inline";

export type ButtonProps = {
  id?: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  danger?: boolean;
  onResize?: (boundingClientRect) => void;
  htmlTitle?: string;
  align?: "center" | "left";
  type?: "button" | "submit";
  fluid?: boolean;
  wrap?: boolean;
  iconSize?: number;
} & (
  | { text: string; icon?: IconType | React.FunctionComponent }
  | { text?: string; icon: IconType | React.FunctionComponent }
);
