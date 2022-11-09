import type { ButtonProps } from "@components/Button";

export type InputListProps = {
  id: string;
  name: string;
  value: any[];
  disabled?: boolean;
  fieldValidator?: (value: any) => undefined | string;
  mask?: (value: string) => string;
  unmask?: (maskedValue: string) => string;
  addNewButton?: ButtonProps;
  state: any;
  allowEmpty?: boolean;
};
