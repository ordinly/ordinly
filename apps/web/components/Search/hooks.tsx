import { useEffect, useState, useReducer, useCallback } from "react";

import { debounce } from "lodash";

import { pageSizes } from "@components/Pagination";

import type { SearchParams } from "./types";

export const useSearch = ({
  onFetchData,
  entity,
  _ids: initialIds = [],
  page: initialPage = 1,
  pageSize: initialPageSize = pageSizes[0].value,
  exclude = [],
}: {
  onFetchData: (newSearchValue: SearchParams) => Promise<any>;
  entity: string;
  page?: number;
  pageSize?: number;
  exclude?: string[];
  _ids?: string[];
}) => {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const [searchValues, setSearchValues] = useState<SearchParams>({
    _ids: initialIds,
    page: initialPage,
    pageSize: initialPageSize,
    searchTerm: "",
    exclude,
  });

  const resetSearchValues = () => {
    setSearchValues({
      page: initialPage,
      pageSize: initialPageSize,
      searchTerm: "",
      exclude,
      _ids: initialIds,
    });
  };

  const changeSearchValues = (newSearchValues: SearchParams) => {
    const { page, pageSize, searchTerm, filters } = newSearchValues;

    const newValues = { ...searchValues } as SearchParams;

    if (page) {
      newValues.page = page;
    }

    if (pageSize) {
      newValues.page = 1;
      newValues.pageSize = pageSize;
    }

    if (searchTerm !== newValues.searchTerm) {
      newValues.searchTerm = searchTerm ?? "";

      if (searchTerm) {
        newValues._ids = [];
      } else {
        newValues._ids = initialIds;
      }
    }

    if (filters) {
      newValues.page = 1;

      Object.entries(filters).forEach(([key, value]) => {
        newValues[key] = value;
      });
    }

    setSearchValues(newValues);
  };

  const fetchData = useCallback(
    debounce(async (newSearchValues) => {
      setLoading(true);
      const { total: newTotal, ...rest } =
        (await onFetchData(newSearchValues)) || {};

      setItems(rest[entity] || []);
      setTotal(newTotal);

      setLoading(false);
      setLoaded(true);
    }, 200),
    [onFetchData]
  );

  useEffect(() => {
    (async () => {
      fetchData(searchValues);
    })();
  }, [searchValues, fetchData, entity]);

  return {
    items,
    loading,
    total,
    fetchData,
    searchValues,
    changeSearchValues,
    resetSearchValues,
  };
};
