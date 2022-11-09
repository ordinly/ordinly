import { useState, useMemo } from "react";

import { Field, FormSpy } from "react-final-form";

import { Tabs } from "@components/Tabs";
import { Form } from "@components/Form";
import { Checkbox } from "@components/Checkbox";

import styles from "./PermissionsInput.module.css";

import type { PermissionsInputProps } from "./types";

const getDisplayText = (key) => {
  const splitOnDot = key.split(".");

  const last = splitOnDot[splitOnDot.length - 1];

  const split = last.split(/(?=[A-Z])/);

  const text = split.reduce((total, current, index) => {
    if (!index) {
      return `${current[0].toUpperCase()}${current.slice(1)}`;
    } else {
      return `${total} ${current.toLowerCase()}`;
    }
  }, "");

  return (
    <p
      className={`${splitOnDot?.length === 1 ? styles.title : styles.subtitle}`}
    >
      {text}
    </p>
  );
};

const flattenValue = (obj, newObject = {}, flatKey) => {
  Object.entries(obj).forEach(([key, value]) => {
    let newKey;

    if (flatKey === undefined) {
      newKey = key;
    } else {
      newKey = `${flatKey}.${key}`;
    }

    let newValue = obj[key];

    if (typeof newValue === "object") {
      flattenValue(value, newObject, newKey);
    } else {
      newObject[newKey] = value;
    }
  });
};

const PermissionsInput = ({
  value,
  onChange,
  initialValue,
  noTabs = false,
  readOnly = false,
}: PermissionsInputProps) => {
  const [activeTab, setActiveTab] = useState();

  const onChangeTab = (newTab) => {
    setActiveTab(newTab);
  };

  const tabs = !noTabs
    ? useMemo(() => {
        if (initialValue) {
          const topLevel = Object.keys(initialValue).map((title) => ({
            id: title,
            text: getDisplayText(title).toString(),
          }));

          onChangeTab(topLevel[0]?.id);

          return topLevel;
        }
      }, [initialValue])
    : null;

  const getFlatRows = (key, value) => {
    const subRow = Object.entries(value).reduce((total, [subKey, subValue]) => {
      if (!["add", "edit", "remove", "view"].includes(subKey)) {
        return [...total, [`${key}.${subKey}`, subValue]];
      }

      return total;
    }, []);

    return (
      <>
        <tr>
          <th className={styles.titleCell}>{getDisplayText(key)}</th>
          <th className={styles.cell}>
            {value.hasOwnProperty("add") ? (
              <Field
                type="checkbox"
                name={`${key}.add`}
                disabled={readOnly}
                render={({ input: { onChange, checked } }) => {
                  return (
                    <Checkbox
                      value={checked}
                      onChange={onChange}
                      disabled={readOnly}
                    />
                  );
                }}
              />
            ) : null}
          </th>
          <th className={styles.cell}>
            {value.hasOwnProperty("view") ? (
              <Field
                type="checkbox"
                name={`${key}.view`}
                disabled={readOnly}
                render={({ input: { onChange, checked } }) => {
                  return (
                    <Checkbox
                      value={checked}
                      onChange={onChange}
                      disabled={readOnly}
                    />
                  );
                }}
              />
            ) : null}
          </th>
          <th className={styles.cell}>
            {value.hasOwnProperty("edit") ? (
              <Field
                type="checkbox"
                name={`${key}.edit`}
                disabled={readOnly}
                render={({ input: { onChange, checked } }) => {
                  return (
                    <Checkbox
                      value={checked}
                      onChange={onChange}
                      disabled={readOnly}
                    />
                  );
                }}
              />
            ) : null}
          </th>
          <th className={styles.cell}>
            {value.hasOwnProperty("remove") ? (
              <Field
                type="checkbox"
                name={`${key}.remove`}
                render={({ input: { onChange, checked } }) => {
                  return (
                    <Checkbox
                      value={checked}
                      onChange={onChange}
                      disabled={readOnly}
                    />
                  );
                }}
              />
            ) : null}
          </th>
        </tr>

        {subRow?.length ? (
          <>{subRow.map(([subKey, subRow]) => getFlatRows(subKey, subRow))}</>
        ) : null}
      </>
    );
  };

  const rows = useMemo(() => {
    if ((noTabs && value) || (activeTab && value[activeTab])) {
      return Object.entries(noTabs ? value : value[activeTab ?? 0]).map(
        ([key, value]) => {
          return getFlatRows(key, value);
        }
      );
    }
  }, [activeTab, value, initialValue]);

  return (
    <>
      {!noTabs ? (
        <Tabs
          id="permissions-tabs"
          tabs={tabs}
          value={activeTab}
          onChange={onChangeTab}
        />
      ) : null}

      <table className={styles.table}>
        <colgroup>
          <col></col>
          <col style={{ width: "80px" }}></col>
          <col style={{ width: "80px" }}></col>
          <col style={{ width: "80px" }}></col>
        </colgroup>

        <thead>
          <tr>
            <th className={styles.empty}></th>
            <th className={styles.cell}>Add</th>
            <th className={styles.cell}>View</th>
            <th className={styles.cell}>Edit</th>
            <th className={styles.cell}>Remove</th>
          </tr>
        </thead>

        <tbody>
          <Form
            initialValues={noTabs ? value : value[activeTab ?? 0]}
            onSubmit={() => {}}
            render={() => {
              return (
                <>
                  {rows}

                  <FormSpy
                    subscription={{
                      values: true,
                    }}
                    onChange={({ values }) => {
                      if (
                        values &&
                        (noTabs || activeTab) &&
                        Object.keys(values)?.length &&
                        onChange
                      ) {
                        onChange(
                          noTabs
                            ? values
                            : {
                                ...value,
                                [activeTab ?? 0]: values,
                              }
                        );
                      }
                    }}
                  />
                </>
              );
            }}
          />
        </tbody>
      </table>
    </>
  );
};

export default PermissionsInput;
