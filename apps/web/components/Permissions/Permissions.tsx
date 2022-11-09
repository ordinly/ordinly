import { useState, useMemo, useCallback } from "react";

import { Field, FormSpy } from "react-final-form";

import { merge } from "lodash";

import { Checkbox } from "@components/Checkbox";
import { Tabs } from "@components/Tabs";
import { Form } from "@components/Form";

import styles from "./Permissions.module.css";

import diff from "@util/diff";

import { IconType } from "@components/Icon";

const keyMapping = {
  roles: "Roles",
  teams: "Teams",
  workers: "Workers",
  projects: "Projects",
  assignedProjects: "Assigned",
  nonAssignedProjects: "Non-assigned",
  tasks: "Tasks",
  assignedTasks: "Assigned",
  nonAssignedTasks: "Non-assigned",
  subtasks: "Subtasks",
  assignedSubtasks: "Assigned",
  nonAssignedSubtasks: "Non-assigned",
  details: "Details",
  contactInfo: "Contact info",
  assignedTeams: "Assigned",
  nonAssignedTeams: "Non-assigned",
  clients: "Clients",
  contacts: "Contacts",
  companies: "Companies",
};

const mandatory = [
  "projects.assignedProjects.view",
  "tasks.assignedTasks.view",
  "subtasks.assignedSubtasks.view",
  "workers.view",
  "roles.view",
  "teams.assignedTeams.view",
  "contactInfo.view",
  "details.view",
  "clients.view",
];

const Permissions = ({ value, onChange, disabled, variant = "role" }) => {
  const [tabValue, setTabValue] = useState(
    variant === "role" ? "permissions-settings-tab" : "permissions-projects-tab"
  );

  const tabs =
    variant === "role"
      ? [
          {
            id: "permissions-settings-tab",
            text: "Company",
            disabled: false,
            icon: "company" as IconType,
          },
          {
            id: "permissions-clients-tab",
            text: "Clients",
            disabled: false,
            icon: "client" as IconType,
          },
          {
            id: "permissions-people-tab",
            text: "People",
            disabled: false,
            icon: "people" as IconType,
          },
        ]
      : variant === "client"
      ? [
          {
            id: "permissions-projects-tab",
            text: "Projects",
            disabled: false,
            icon: "project" as IconType,
          },
        ]
      : [];

  const tabMappings =
    variant === "role"
      ? {
          "permissions-people-tab": ["roles", "teams", "workers"],
          "permissions-settings-tab": ["details", "contactInfo"],
          "permissions-clients-tab": [
            "projects",
            "assignedProjects",
            "nonAssignedProjects",
            "tasks",
            "assignedTasks",
            "nonAssignedTasks",
            "subtasks",
            "assignedSubtasks",
            "nonAssignedSubtasks",
            "clients",
            "contacts",
          ],
        }
      : variant === "client"
      ? {
          "permissions-projects-tab": [
            "companies",
            "projects",
            "assignedProjects",
            "nonAssignedProjects",
            "tasks",
            "assignedTasks",
            "nonAssignedTasks",
            "subtasks",
            "assignedSubtasks",
            "nonAssignedSubtasks",
          ],
        }
      : {};

  const onChangeTab = (newTab) => {
    setTabValue(newTab);
  };

  const getPermissionsRows = useCallback((rowData, parentKey = null) => {
    return Object.entries(rowData).map(([key, objectValue]: [string, any]) => {
      if (objectValue.hasOwnProperty("edit")) {
        return (
          <tr key={key} className={styles.row}>
            <td
              className={`${styles.title} ${parentKey ? styles.subtitle : ""}`}
            >
              {keyMapping[key]}
            </td>

            <td className={styles.cell}>
              {objectValue.hasOwnProperty("add") ? (
                <Field
                  type="checkbox"
                  name={`${parentKey ? `${parentKey}.` : ""}${key}.add`}
                  render={({ input: { onChange, checked } }) => {
                    return (
                      <Checkbox
                        value={checked}
                        onChange={onChange}
                        disabled={disabled}
                      />
                    );
                  }}
                />
              ) : null}
            </td>

            <td className={styles.cell}>
              <Field
                type="checkbox"
                name={`${parentKey ? `${parentKey}.` : ""}${key}.view`}
                render={({ input: { onChange, checked } }) => {
                  return (
                    <Checkbox
                      value={checked}
                      onChange={onChange}
                      disabled={
                        disabled ||
                        mandatory.includes(
                          `${parentKey ? `${parentKey}.` : ""}${key}.view`
                        )
                      }
                    />
                  );
                }}
              />
            </td>

            <td className={styles.cell}>
              <Field
                type="checkbox"
                name={`${parentKey ? `${parentKey}.` : ""}${key}.edit`}
                render={({ input: { onChange, checked } }) => {
                  return (
                    <Checkbox
                      value={checked}
                      onChange={onChange}
                      disabled={disabled}
                    />
                  );
                }}
              />
            </td>

            <td className={styles.cell}>
              <Field
                type="checkbox"
                name={`${parentKey ? `${parentKey}.` : ""}${key}.remove`}
                render={({ input: { onChange, checked } }) => {
                  return (
                    <Checkbox
                      value={checked}
                      onChange={onChange}
                      disabled={disabled}
                    />
                  );
                }}
              />
            </td>
          </tr>
        );
      } else {
        return (
          <>
            <tr key={key} className={styles.row}>
              <td className={styles.title}>{keyMapping[key]}</td>

              {objectValue.hasOwnProperty("add") ? (
                <td className={styles.cell}>
                  <Field
                    type="checkbox"
                    name={`${key}.add`}
                    render={({ input: { onChange, checked } }) => {
                      return (
                        <Checkbox
                          value={checked}
                          onChange={onChange}
                          disabled={disabled}
                        />
                      );
                    }}
                  />
                </td>
              ) : (
                <td className={styles.cell}></td>
              )}

              <td className={styles.cell}></td>
              <td className={styles.cell}></td>
              <td className={styles.cell}></td>
            </tr>

            {getPermissionsRows(
              Object.fromEntries(
                Object.entries(objectValue).filter(
                  ([key, value]) => typeof value !== "boolean"
                )
              ),
              key
            )}
          </>
        );
      }
    });
  }, []);

  const display = useMemo(() => {
    return getPermissionsRows(
      Object.entries(value).reduce((total, [key, value]) => {
        if (tabMappings[tabValue].includes(key)) {
          return { ...total, [key]: value };
        } else {
          return total;
        }
      }, {})
    );
  }, [tabValue, value]);

  return (
    <Form
      initialValues={value}
      onSubmit={() => {}}
      render={() => {
        return (
          <>
            <Tabs
              id="permissions-tabs"
              value={tabValue}
              tabs={tabs}
              onChange={onChangeTab}
            />

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

              <tbody>{display}</tbody>
            </table>

            <FormSpy
              subscription={{
                values: true,
              }}
              onChange={({ values }) => {
                if (values) {
                  const differences = diff(value, values);
                  if (differences) {
                    if (Object.entries(differences).length) {
                      setTimeout(() => onChange({ ...merge(values) }), 0);
                    }
                  }
                }
              }}
            />
          </>
        );
      }}
    />
  );
};

export default Permissions;
