import type { CSSProperties, ReactElement } from "react";

export type ColumnType = {};

export type TableProps<RowDefinition> = {
  id: string;
  columns: {
    title?: string;
    dataKey: keyof RowDefinition;
    sticky?: boolean;
    display?: (args: {
      data: any;
      tableId: string;
      row: RowDefinition;
    }) => ReactElement;
    style?: CSSProperties;
  }[];
  rows: RowDefinition[];
  onRowClick?: (row: RowDefinition) => void;
};
