export type ClientTileProps = {
  _id?: string;
  name: string;
  companyId?: string;
  description?: string;
  onClick?: () => void;
  projects?: string[];
  contacts?: string[];
};
