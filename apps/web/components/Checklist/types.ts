export type ChecklistItem = { complete: boolean; name: string; order: number };

export type ChecklistProps = {
  value: ChecklistItem[];
  onChange: (newValue: ChecklistItem[]) => void;
};
