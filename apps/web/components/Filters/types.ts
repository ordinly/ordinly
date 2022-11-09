import type { ButtonProps } from "@components/Button";

export type FilterProps = {
  id: string;
  actions?: ButtonProps[];
  onChange: (filters: { search: string; [key: string]: any }) => void;
  filters: { [key: string]: any };
};
