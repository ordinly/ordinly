export type ProfilePictureProps = {
  id?: string;
  variant?: "user" | "company";
  _id: string;
  size?: "extra-small" | "small" | "medium" | "large";
  onClick?: () => void;
  onChange?: (newValue: File) => void;
  readOnly?: boolean;
};
