import type { IconType } from "@components/Icon";

export type InternalTabProps = {
  active: boolean;
  onClick: (text: string) => void;
};

export type TabProps = {
  id: string;
  text: string;
  disabled?: boolean;
  icon?: IconType;
  error?: boolean | string;
};
