import type { IconType } from "@components/Icon";

export type InternalContentSwitcherItemProps = {
  active: boolean;
  onClick: (text: string) => void;
};

export type ContentSwitcherItemProps = {
  id: string;
  text?: string;
  disabled?: boolean;
  icon?: IconType;
  value: string;
  size: "medium" | "large";
};
