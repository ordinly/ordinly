import type { ContentSwitcherItemProps } from "./Item";

export type ContentSwitcherProps = {
  id: string;
  items: ContentSwitcherItemProps[];
  value: string;
  onChange: (newValue: string) => void;
  size?: "medium" | "large";
};
