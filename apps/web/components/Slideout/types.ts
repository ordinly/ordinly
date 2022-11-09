import type { ButtonProps } from "@components/Button";

export type SlideoutProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: any;
  id: string;
  closeOnBackdropClick?: boolean;
  saving?: boolean;
  actions?: ButtonProps[];
  dirty?: boolean;
  steps?: { text: string; content: JSX.Element }[];
  tabs?: { text: string; content: JSX.Element; id: string; error?: string }[];
};
