import iconMapping from "./IconMapping";
export declare type IconType = keyof typeof iconMapping;
export declare type IconProps = {
    icon: IconType;
    size?: number;
};
