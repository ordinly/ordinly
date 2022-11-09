import type { IconType } from "../../components/Icon";
export declare type ButtonVariants = "ghost" | "primary" | "secondary" | "danger" | "outline" | "success";
export declare type ButtonSizes = "large" | "medium" | "small" | "inline";
export declare type ButtonProps = {
    id?: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: ButtonVariants;
    size?: ButtonSizes;
    danger?: boolean;
    onResize?: (boundingClientRect: any) => void;
    htmlTitle?: string;
    align?: "center" | "left";
    type?: "button" | "submit";
    fluid?: boolean;
    wrap?: boolean;
    iconSize?: number;
} & ({
    text: string;
    icon?: IconType;
} | {
    text?: string;
    icon: IconType;
});
