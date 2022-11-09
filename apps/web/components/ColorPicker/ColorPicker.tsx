import { HexColorPicker } from "react-colorful";

import type { ColorPickerProps } from "./types";

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return <HexColorPicker color={value} onChange={onChange} />;
};

export default ColorPicker;
