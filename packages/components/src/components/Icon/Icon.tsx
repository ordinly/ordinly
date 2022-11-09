import iconMapping from "./IconMapping";

import { IconProps } from "./types";

import * as IconImport from "react-icons/fa";

const Icons = { ...IconImport };

const Icon = ({ icon: iconName, size = 20 }: IconProps) => {
  return Icons[iconMapping[iconName]]({ size });
};

export default Icon;
