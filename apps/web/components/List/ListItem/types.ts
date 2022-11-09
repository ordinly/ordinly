export type ListItemProps = {
  text: string;
  onRemove: (value: any) => void;
  index: number;
  hideActions?: boolean;
};
