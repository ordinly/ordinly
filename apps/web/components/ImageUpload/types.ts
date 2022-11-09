import type { OnBlurHandler, OnFocusHandler } from "@components/types";

export type ImageUploadProps = {
  id: string;
  value?: { key: string; name: string };
  onChange: (newValue: File) => void;
  onBlur?: OnBlurHandler<HTMLInputElement>;
  onFocus?: OnFocusHandler<HTMLInputElement>;
  onUpload: ({ file }: { file: File } & { [key: string]: any }) => any;
  disabled?: boolean;
  location: string;
  src: string;
  variant: "round" | "square";
};
