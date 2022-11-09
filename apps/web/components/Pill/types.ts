import type { IconType } from "@components/Icon";

export type PillProps = {
  text: string;
  icon?: IconType;
  htmlTitle?: string;
  color?: string;
  textColor?: string;
  onClick?: (event) => void;
  onRemove?: () => void;
};
