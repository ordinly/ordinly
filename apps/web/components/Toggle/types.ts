import { ChangeEventHandler } from "react";

export type ToggleProps = {
  id: string;
  toggled: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  name?: string;
};
