import type { SelectSizes, SelectOptionProps } from "@components/Select";

export type MultiSelectProps = {
  id: string;
  options: SelectOptionProps[];
  onChange: (value: any[]) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  value: any[];
  size?: SelectSizes;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  menuOffset?: { x: number; y: number };
  clearable?: boolean;
  open?: boolean;
  focusOnOpen?: boolean;
};
