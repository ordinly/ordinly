import type { OnBlurHandler, OnFocusHandler } from "@components/types";

import type { SelectOptionProps } from "@components/Select";

export type SelectListProps = {
  id: string;
  value: any[];
  onChange: (props: any[]) => void;
  onBlur?: OnBlurHandler<HTMLInputElement>;
  onFocus?: OnFocusHandler<HTMLInputElement>;
  disabled?: boolean;
  touched?: boolean;
  options: SelectOptionProps[];
  menuOffset?: { x: number; y: number };
};
