import { ReactNode } from "react";

import type { ButtonProps } from "@components/Button";

export type ButtonWithMenuProps = ButtonProps & {
  buttonId: string;
  menuId: string;
  fluid?: boolean;
  menu: () => ReactNode;
};
