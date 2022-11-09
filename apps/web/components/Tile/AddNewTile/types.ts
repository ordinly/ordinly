import type { IconType } from "@components/Icon";

export type AddNewTileProps = {
  id: string;
  type?: string;
  icon: IconType;
  onClick: () => void;
  singular?: boolean;
  text?: string;
};
