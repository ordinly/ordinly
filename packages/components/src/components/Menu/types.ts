export type MenuProps = {
  id: string;
  align?: "left" | "center" | "right";
  children: any;
  onClose: () => void;
  mountId: string;
  closeOnClick?: boolean;
  position?: "top" | "right" | "bottom" | "left";
  xOffset?: number;
  yOffset?: number;
  fluid?: boolean;
  focusOnOpen?: boolean;
  focusOnClose?: boolean;
  closeOnBlur?: boolean;
  menuRef?: any;
};
