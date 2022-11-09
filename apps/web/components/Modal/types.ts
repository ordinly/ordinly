import type { ButtonProps } from "@components/Button";

export type ModalProps = {
  open: boolean;
  onClose?: () => void;
  title: string;
  children?: any;
  id: string;
  closeOnBackdropClick?: boolean;
  actions?: ButtonProps[];
  closeText?: string;
};
