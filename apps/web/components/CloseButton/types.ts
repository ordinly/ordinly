import type { IconType } from "@components/Icon";

export type CloseButtonProps = {
  id: string;
  onClick: () => void;
  icon?: IconType;
  htmlTitle?: string;
};
