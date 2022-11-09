export type CompanyTileProps = {
  _id: string;
  name: string;
  description?: string;
  pending: boolean;
  onClick: () => void;
  createdAt: Date;
  addedOn: Date;
};
