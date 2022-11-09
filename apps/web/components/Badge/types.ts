export type BadgeVariants = "primary" | "warning";

import type { IconType } from "@components/Icon";

export type BadgeProps = {
  variant?: BadgeVariants;
  number?: number;
  icon?: IconType;
  children: any;
  visible?: boolean;
};
