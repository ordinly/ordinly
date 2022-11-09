export type DocumentTileProps = {
  _id: string;
  issueDate: Date;
  dueDate: Date;
  number: string;
  total: number;
  kind: "Invoice" | "Quote";
  onClick: () => void;
};
