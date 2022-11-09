export type TextListProps = {
  onChange: (newValue: string[]) => void;
  value: string[];
  validateEntry?: (value: string, array: string[]) => any;
};
