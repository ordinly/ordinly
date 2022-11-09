import { Field, FieldArray } from "@components/Field";
import { Button } from "@components/Button";
import { Select } from "@components/Select";
import { SelectList } from "@components/List";
import { Permissions } from "@components/Permissions";

import { required } from "@components/Form/validation";

import styles from "./Assignees.module.css";

const defaultPermissions = {
  companies: {
    view: true,
    add: false,
    edit: false,
    remove: false,
  },
  projects: {
    assignedProjects: {
      view: true,
      edit: true,
      remove: true,
    },
    nonAssignedProjects: {
      view: true,
      edit: false,
      remove: false,
    },
  },
  tasks: {
    add: false,
    assignedTasks: {
      view: true,
      edit: true,
      remove: true,
    },
    nonAssignedTasks: {
      view: true,
      edit: false,
      remove: false,
    },
  },
  subtasks: {
    add: true,
    assignedSubtasks: {
      view: true,
      edit: true,
      remove: true,
    },
    nonAssignedSubtasks: {
      view: true,
      edit: false,
      remove: false,
    },
  },
};

const AssigneesStep = ({ company, push }) => {
  const onAddItem = () => {
    push("assignedCompanies", undefined);
  };
  return (
    <>
      <Field
        title="Assigned workers"
        name="workers"
        component={SelectList}
        options={company?.workers.map(({ _id, name }) => ({
          value: _id,
          label: name,
        }))}
        id="new-project-workers-input"
      />

      <Field
        title="Assigned teams"
        name="teams"
        component={SelectList}
        options={company?.teams.map(({ _id, name }) => ({
          value: _id,
          label: name,
        }))}
        id="new-project-teams-input"
      />

      <div className={styles.container}>
        <p className={styles.sectionTitle}>Assigned companies</p>

        <div className={styles.fieldContainer}>
          <FieldArray name="assignedCompanies">
            {({ fields }) => (
              <>
                {fields?.length
                  ? fields.map((name, index) => (
                      <div className={styles.tileContainer}>
                        <Field
                          title="Assigned companies"
                          name={`${name}.companyId`}
                          component={Select}
                          options={company?.clients.map(
                            ({ companyId, name }) => ({
                              value: companyId,
                              label: name,
                            })
                          )}
                          validate={required}
                          id={`new-project-companies-input-${name}`}
                        />

                        <Field
                          title="Permissions"
                          name={`${name}.permissions`}
                          variant="client"
                          component={Permissions}
                          id={`assign-company-permissions-${name}`}
                          initialValue={defaultPermissions}
                        />

                        <div className={styles.button}>
                          <Button
                            id="remove-new-company-item-button"
                            text="Remove company"
                            icon="trash"
                            onClick={() => fields.remove(index)}
                            variant="ghost"
                          />
                        </div>
                      </div>
                    ))
                  : null}
              </>
            )}
          </FieldArray>
        </div>

        <div className={styles.summary}>
          <div>
            <Button
              text="Add a company"
              onClick={onAddItem}
              variant="outline"
              icon="add"
              size="small"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AssigneesStep;
