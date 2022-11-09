export type PaginationProps = {
  page?: number;
  pageSize?: 15 | 30 | 45;
  total: number;
  onChange?: ({ page, pageSize }: { page: number; pageSize: number }) => void;
  onChangePage?: ({ page }: { page: number }) => void;
  onChangePageSize?: ({ pageSize }: { pageSize: number }) => void;
};

export const pageSizes = [
  { label: "10", value: 10 },
  { label: "25", value: 25 },
  { label: "50", value: 50 },
];
