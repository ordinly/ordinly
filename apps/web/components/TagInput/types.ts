export type TagInputProps = {
  value: any;
  onChange: ({ key, value }) => void;
  readOnly: boolean;
  onRemove?: () => void;
  error?: boolean;
};
