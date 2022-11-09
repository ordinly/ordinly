export type SliderProps = {
  id: string;
  value: number[];
  onChange: (value: number[]) => void;
  min: number;
  max: number;
  variant: "single" | "range";
};
