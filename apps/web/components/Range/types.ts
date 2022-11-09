export type RangeProps = {
  id: string;
  value: [string, string];
  onChange: (newValue) => void;
  variant?: "number" | "date";
};
