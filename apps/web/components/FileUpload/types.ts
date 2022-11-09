import type { OnBlurHandler, OnFocusHandler } from "@components/types";

export type FileUploadProps = {
  id: string;
  value?: (File & { _id: string })[];
  onChange?: (files: (File & { _id: string })[]) => void;
  onBlur?: OnBlurHandler<HTMLInputElement>;
  onFocus?: OnFocusHandler<HTMLInputElement>;
  onUpload: ({
    file,
    files,
  }: ({ file: File } | { files: File[] }) & { [key: string]: any }) => void;
  onRemove: ({ _id }: { _id: string }) => void;
  disabled?: boolean;
  multi?: boolean;
  getHref: (fileId) => string;
};
