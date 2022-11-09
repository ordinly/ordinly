import type {
  OnChangeHandler,
  OnBlurHandler,
  OnFocusHandler,
} from "@components/types";

import type { IconType } from "@components/Icon";

export type InputSizes = "large" | "medium" | "small";

export type InputProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: OnBlurHandler<HTMLInputElement>;
  onFocus?: OnFocusHandler<HTMLInputElement>;
  onClick?: () => void;
  disabled?: boolean;
  size?: InputSizes;
  error?: boolean;
  htmlType?: "password" | "text" | "date" | "number";
  htmlTitle?: string;
  mask?: (value: string) => string;
  unmask?: (maskedValue: string) => string;
  autocomplete?: string;
  placeholder?: string;
  readOnly?: boolean;
  icon?: IconType;
};
