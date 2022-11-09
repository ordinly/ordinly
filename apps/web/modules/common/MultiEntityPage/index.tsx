import { useEffect, useState, useContext } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { PageContent } from "@components/Layout";
import { Grid } from "@components/Grid";
import { Table } from "@components/Table";
import { Filters } from "@components/Filters";
import { Tabs } from "@components/Tabs";
import { Icon } from "@components/Icon";
import { Button } from "@components/Button";
import { Pagination } from "@components/Pagination";

import UserContext from "@contexts/UserContext";
import SettingsContext from "@contexts/SettingsContext";

import styles from "./MultiEntityPage.module.css";

const MultiEntityPage = ({
  title,
  subtitle,
  icon,
  breadcrumbs,
  filters: { filters, searchableColumns, actions } = {
    filters: {},
    searchableColumns: [],
    actions: [],
  },
  entities,
  columns,
  fetchData,
  tile: Tile,
  tabs: { tabs, onChangeTab } = { tabs: [], onChangeTab: () => {} },
}) => {
  const { view } = useContext(SettingsContext);

  const [pagination, setPagination] = useState({ page: 1, pageSize: 15 });
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [stored, setStored] = useState(entities || []);
  const [filtered, setFiltered] = useState(stored || []);

  const router = useRouter();

  const onPaginationChange = async (newPagination) => {
    setPagination(newPagination);
  };

  useEffect(() => {
    (async () => {
      if (!loading) {
        setLoading(true);

        const { total: newTotal } = (await fetchData(pagination)) || {};

        setTotal(newTotal);

        setLoading(false);
      }
    })();
  }, [pagination]);

  useEffect(() => {
    setFiltered(stored);
  }, [stored]);

  useEffect(() => {
    if (
      entities?.length !== stored?.length ||
      !stored.every(({ _id }) =>
        entities.find(({ _id: entityId }) => _id === entityId)
      )
    ) {
      setStored(entities);
    }
  }, [entities]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <PageContent
        title={title}
        subtitle={subtitle}
        breadcrumbs={breadcrumbs}
        hasViewToggle
      >
        {tabs?.length ? (
          <Tabs
            id={`${title}-tabs`}
            tabs={tabs}
            value={router?.query?.tab as string}
            onChange={onChangeTab}
          />
        ) : null}

        {entities?.length ? (
          <>
            <Filters
              id={`${title}-filters`}
              onChange={(values) => {
                const { search, ...rest } = values;

                let newFiltered = [...(entities || [])];

                newFiltered = newFiltered.filter((row) => {
                  let containsSearch = false;

                  if (![undefined, null].includes(search)) {
                    for (let i = 0; i < searchableColumns.length; i++) {
                      if (
                        row[searchableColumns[i]] &&
                        row[searchableColumns[i]]
                          .toString()
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        containsSearch = true;
                      }
                    }
                  } else {
                    containsSearch = true;
                  }

                  for (const property in rest) {
                    const validator = filters[property]?.validator;

                    if (validator) {
                      if (!validator(row[property], rest[property])) {
                        return false;
                      }
                    }
                  }

                  return containsSearch;
                });

                setFiltered(newFiltered);
              }}
              filters={filters}
              actions={actions}
            />

            {filtered?.length ? (
              <>
                {view === "cards" ? (
                  <Grid>
                    {filtered?.map(({ _id, ...props }) => (
                      <Tile key={_id} _id={_id} {...props} />
                    ))}
                  </Grid>
                ) : (
                  <Table
                    id={`${title}-table`}
                    columns={columns}
                    rows={filtered}
                  />
                )}
              </>
            ) : null}
          </>
        ) : (
          <div className={styles.empty}>
            <div className={styles.column}>
              <div className={styles.emptyIcon}>
                <Icon icon={icon || "empty-items"} size={120} />
              </div>

              <h3 className={styles.emptyTitle}>
                Looks like you don't have any {title.toLowerCase()}
              </h3>

              {actions?.length ? (
                <>
                  <p className={styles.emptyText}>
                    Click the button below to add one and get started
                  </p>

                  <Button {...actions[0]} size="medium" />
                </>
              ) : null}
            </div>
          </div>
        )}
      </PageContent>
    </>
  );
};

export default MultiEntityPage;
