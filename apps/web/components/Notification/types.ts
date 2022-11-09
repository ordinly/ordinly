import { OnMouseEvent } from "../types";

export type NotificationProps = {
  title: string;
  message: string;
  variant: "warning" | "info" | "error" | "success";
  onClose: () => void;
  onMouseEnter: OnMouseEvent;
  onMouseLeave: OnMouseEvent;
};
