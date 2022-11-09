import type { TabProps } from "./Tab";

export type TabsProps = {
  id: string;
  tabs: (TabProps & { [key: string]: any })[];
  value: string;
  onChange: (newValue: string) => void;
};
