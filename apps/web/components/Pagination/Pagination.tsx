import { useState } from "react";

import { Select } from "@components/Select";

import { pageSizes } from "./types";

import type { PaginationProps } from "./types";

import styles from "./Pagination.module.css";

const Pagination = ({
  page: pageProp,
  pageSize: pageSizeProp,
  total = 0,
  onChange,
  onChangePage,
  onChangePageSize,
}: PaginationProps) => {
  const [page, setPage] = useState(pageProp ?? 1);
  const [pageSize, setPageSize] = useState(pageSizeProp ?? pageSizes[0].value);

  const onPaginationChange = ({
    page: newPage,
    pageSize: newPageSize,
  }: {
    page?: number;
    pageSize?: number;
  }) => {
    if (newPage) {
      setPage(newPage);
    }

    if (newPageSize) {
      setPageSize(newPageSize);
    }

    if (onChange) {
      onChange({ page: newPage ?? page, pageSize: newPageSize ?? pageSize });
    }

    if (onChangePage && newPage) {
      onChangePage({ page: newPage ?? page });
    }

    if (onChangePageSize && newPageSize) {
      onChangePageSize({ pageSize: newPageSize ?? pageSize });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.pagesContainer}>
        <div className={styles.pages}>
          <button
            disabled={page === 1}
            className={styles.button}
            onClick={() => onPaginationChange({ page: page - 1 })}
          >
            {"<"}
          </button>

          {Array.from(Array(page - 1).keys())
            .reverse()
            .map((value) => (
              <u
                className={styles.pageNumber}
                onClick={() => onPaginationChange({ page: value + 1 })}
              >
                {value + 1}
              </u>
            ))}

          <p className={`${styles.pageNumber} ${styles.current}`}>{page}</p>

          {Array.from(Array(Math.ceil(total / pageSize)).keys()).map(
            (value) => (
              <>
                {value >= page ? (
                  <u
                    className={styles.pageNumber}
                    onClick={() => onPaginationChange({ page: value + 1 })}
                  >
                    {value + 1}
                  </u>
                ) : null}
              </>
            )
          )}

          <button
            disabled={total / pageSize <= page}
            className={styles.button}
            onClick={() => onPaginationChange({ page: page + 1 })}
          >
            {">"}
          </button>
        </div>
      </div>

      <div className={styles.settingsContainer}>
        <div className={styles.settings}>
          <Select
            id="pagination-select"
            options={pageSizes}
            value={pageSize}
            onChange={(value) => onPaginationChange({ pageSize: value })}
          />

          <p className={styles.info}>
            {page * pageSize - pageSize + 1} -{" "}
            {Math.min(page * pageSize, total)} of {total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
