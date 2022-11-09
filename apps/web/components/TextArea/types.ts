import type {
  OnChangeHandler,
  OnBlurHandler,
  OnFocusHandler,
} from "@components/types";

export type TextAreaProps = {
  id?: string;
  value: string;
  onChange: OnChangeHandler<HTMLTextAreaElement>;
  onBlur?: OnBlurHandler<HTMLTextAreaElement>;
  onFocus?: OnFocusHandler<HTMLTextAreaElement>;
  disabled?: boolean;
  error?: boolean;
  rows?: number;
};
