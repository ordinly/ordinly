export type SelectOptionProps = { value: any; label: string };

export type SelectSizes = "large" | "medium" | "small";

export type SelectProps = {
  id: string;
  options: SelectOptionProps[];
  onChange: (value) => void;
  onBlur?: (value) => void;
  onFocus?: (value) => void;
  onClick?: () => void;
  value: any;
  size?: SelectSizes;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  menuOffset?: { x: number; y: number };
  clearable?: boolean;
  open?: boolean;
  focusOnOpen?: boolean;
};
