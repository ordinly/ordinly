export type RadioOption = {
  id: string;
  text: string;
  value: string;
};

export type RadioProps = {
  id: string;
  options: RadioOption[];
  onChange: (value) => void;
  onBlur?: (value) => void;
  onFocus?: (value) => void;
  checked?: boolean;
  name: string;
  value: string;
};
