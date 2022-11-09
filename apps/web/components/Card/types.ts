import React, { ReactElement } from "react";

export type CardProps = {
  title?: string;
  children: any;
  onEditClick?: () => void;
  actions?: (React.FunctionComponent | ReactElement)[];
};
