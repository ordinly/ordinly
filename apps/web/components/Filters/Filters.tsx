import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Slideout } from "@components/Slideout";
import { Form, AutoSave } from "@components/Form";
import { Field } from "@components/Field";
import { Pill } from "@components/Pill";

import styles from "./Filters.module.css";

import type { FilterProps } from "./types";

const Filters = ({
  id,
  actions,
  onChange = () => {},
  filters,
}: FilterProps) => {
  const [fields, setFields] = useState([]);

  const router = useRouter();

  const onOpenFiltersSlideout = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, filters: true },
    });
  };

  const onCloseFiltersSlideout = () => {
    const temp = router.query;

    delete temp["filters"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  useEffect(() => {
    setFields(Object.entries(filters || {}));
  }, [filters]);

  return (
    <Form
      onSubmit={onChange}
      render={({ form, handleSubmit }) => {
        return (
          <>
            <div id={id} className={styles.actionsContainer}>
              <div className={styles.filtersContainer}>
                <div className={styles.searchContainer}>
                  <Field name="search" component={Input} />
                </div>

                <div className={styles.filterButtonContainers}>
                  {filters ? (
                    <>
                      <div>
                        <Button
                          icon="filters"
                          text="Filters"
                          variant="outline"
                          onClick={onOpenFiltersSlideout}
                          id="filters-button"
                        />
                      </div>

                      {form?.getState()?.values
                        ? Object.entries(form?.getState()?.values).map(
                            ([key, value]) => {
                              if (key !== "search") {
                                if (
                                  value &&
                                  (!Array.isArray(value) ||
                                    (value.length &&
                                      value.some((item) => item)))
                                ) {
                                  return (
                                    <Pill
                                      text={filters[key]?.pillText(value)}
                                      onRemove={() => {
                                        form.change(key, undefined);
                                      }}
                                    />
                                  );
                                }
                              }
                            }
                          )
                        : undefined}
                    </>
                  ) : null}
                </div>
              </div>

              {actions?.map((props) => (
                <div>
                  <Button {...props} />
                </div>
              ))}
            </div>

            <>
              <Slideout
                id="update-filters-slideout"
                title="Update filters"
                open={router?.query?.hasOwnProperty("filters")}
                onClose={onCloseFiltersSlideout}
              >
                <div className={styles.container}>
                  <div className={styles.form}>
                    {fields.map(
                      ([
                        key,
                        {
                          title,
                          control: { component, ...props },
                        },
                      ]) => (
                        <Field
                          title={title}
                          name={key}
                          component={component}
                          {...props}
                        />
                      )
                    )}
                  </div>
                </div>
              </Slideout>

              <AutoSave onSave={handleSubmit} />
            </>
          </>
        );
      }}
    />
  );
};

export default Filters;
