import { useEffect, useState, useContext } from "react";

import { useRouter } from "next/router";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Pagination, pageSizes } from "@components/Pagination";
import { Grid } from "@components/Grid";
import { Table } from "@components/Table";
import { Icon } from "@components/Icon";
import { LoadingIndicator } from "@components/LoadingIndicator";

import SettingsContext from "@contexts/SettingsContext";

import FiltersSlideout from "./FiltersSlideout";

import styles from "./Search.module.css";

const Search = ({
  columns,
  addButton,
  tile: Tile,
  icon,
  entity,
  filters,
  items,
  loading,
  total,
  searchValues,
  changeSearchValues,
  resetSearchValues,
  onClickItem,
}: {
  columns: any;
  addButton?: any;
  tile: any;
  icon: any;
  entity: string;
  filters?: { [key: string]: any };
  items: any[];
  loading?: boolean;
  total: number;
  searchValues: any;
  changeSearchValues: any;
  resetSearchValues: any;
  onClickItem?: any;
}) => {
  const [showLoading, setLoading] = useState(false);

  const { view } = useContext(SettingsContext);
  const router = useRouter();

  const [filtersSlideoutOpen, setFiltersSlideoutOpen] = useState(false);

  const toggleFiltersSlideoutOpen = () => {
    setFiltersSlideoutOpen(!filtersSlideoutOpen);
  };

  useEffect(() => {
    if (!loading && showLoading) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [loading, entity]);

  useEffect(() => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, ...searchValues },
    });
  }, [searchValues]);

  return (
    <>
      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <Input
            value={router.query["searchTerm"] as string}
            onChange={(newSearchTerm) =>
              changeSearchValues({ searchTerm: newSearchTerm })
            }
            size="small"
            placeholder="Search"
          />
        </div>

        {filters?.length ? (
          <div className={styles.actions}>
            <div>
              <Button
                icon="filters"
                text="Filters"
                variant="outline"
                onClick={toggleFiltersSlideoutOpen}
                size="small"
              />
            </div>

            {Object.keys(searchValues).filter(
              (key) => !["page", "pageSize", "searchTerm"].includes(key)
            ).length ? (
              <div>
                <Button
                  text="Clear"
                  variant="ghost"
                  onClick={resetSearchValues}
                  size="small"
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className={styles.content}>
        {showLoading ? (
          <div className={styles.empty}>
            <div className={styles.column}>
              <LoadingIndicator size="extra-large" />
            </div>
          </div>
        ) : (
          <>
            {items?.length ? (
              <>
                {view === "cards" ? (
                  <Grid>
                    {!loading ? (
                      <>
                        {items?.map(({ _id, ...props }) => (
                          <Tile
                            key={_id}
                            _id={_id}
                            {...props}
                            onClick={() => onClickItem({ _id, ...props })}
                          />
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid>
                ) : (
                  <Table
                    id={"search-table"}
                    columns={columns}
                    rows={items}
                    onRowClick={onClickItem}
                  />
                )}
              </>
            ) : (
              <div className={styles.empty}>
                <div className={styles.column}>
                  <div className={styles.emptyIcon}>
                    <Icon icon={icon || "empty-items"} size={75} />
                  </div>

                  <h3 className={styles.emptyTitle}>
                    Looks like you don't have any {entity}
                  </h3>

                  {addButton ? (
                    <>
                      <p className={styles.emptyText}>
                        Click the button below to add one and get started
                      </p>

                      <Button {...addButton} size="medium" />
                    </>
                  ) : null}
                </div>
              </div>
            )}
          </>
        )}

        {total > pageSizes[0].value && !loading ? (
          <Pagination
            total={total}
            onChangePage={changeSearchValues}
            onChangePageSize={changeSearchValues}
            page={searchValues.page}
            pageSize={searchValues.pageSize}
          />
        ) : null}

        {filters?.length ? (
          <FiltersSlideout
            open={filtersSlideoutOpen}
            onSubmit={async (values) => {
              await changeSearchValues(values);
              toggleFiltersSlideoutOpen();
            }}
            onClose={toggleFiltersSlideoutOpen}
            filters={filters}
          />
        ) : null}
      </div>
    </>
  );
};

export default Search;
