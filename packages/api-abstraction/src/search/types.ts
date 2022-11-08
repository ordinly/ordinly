export type SearchArgs = {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  exclude?: string[];
  _ids?: string[];
} & {
  [key: string]: string | number | string[] | number[];
};
