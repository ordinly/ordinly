import type { IconType } from "../../components/Icon";

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
  onResize?: (boundingClientRect: any) => void;
  htmlTitle?: string;
  align?: "center" | "left";
  type?: "button" | "submit";
  fluid?: boolean;
  wrap?: boolean;
  iconSize?: number;
} & ({ text: string; icon?: IconType } | { text?: string; icon: IconType });
