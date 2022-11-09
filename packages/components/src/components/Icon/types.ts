import iconMapping from "./IconMapping";

export type IconType = keyof typeof iconMapping;

export type IconProps = {
  icon: IconType;
  size?: number;
};
