export type SearchProps = {};

export type SearchParams = {
  _ids?: string[];
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  exclude?: string[];
  filters?: { [key: string]: string };
};
