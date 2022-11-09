import { useContext, useState, useMemo, useEffect } from "react";

import { useRouter } from "next/router";

import { isEqual } from "lodash";

import arrayMutators from "final-form-arrays";

import CompanyContext from "@contexts/CompanyContext";
import ProjectContext from "@contexts/ProjectContext";
import NotificationContext from "@contexts/NotificationContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Button } from "@components/Button";
import { SelectList } from "@components/List";
import { Select } from "@components/Select";
import { Field, FieldArray } from "@components/Field";
import { Permissions } from "@components/Permissions";

import { required } from "@components/Form/validation";

import { updateProjectAssignees } from "@ordinly/api-abstraction/companies";

import styles from "./AssigneesCard.module.css";

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

const AssigneesSlideout = () => {
  const { company } = useContext(CompanyContext);
  const { project, fetchProject } = useContext(ProjectContext);
  const { notification } = useContext(NotificationContext);

  const [saving, setSaving] = useState(false);

  const assignees = useMemo(() => {
    const { assignedWorkers, assignedTeams, assignedCompanies } = project || {};

    return {
      assignedWorkers: assignedWorkers?.map(({ _id }) => _id),
      assignedTeams: assignedTeams?.map(({ _id }) => _id),
      assignedCompanies: assignedCompanies?.reduce(
        (total, { companyId, permissions }) => [
          ...total,
          ...(project.owner._id === companyId
            ? []
            : [{ companyId, permissions }]),
        ],
        []
      ),
    };
  }, [project]);

  const router = useRouter();

  const onSave = async (values) => {
    setSaving(true);

    try {
      if (
        project &&
        company &&
        router?.query?.hasOwnProperty("update-project-assignees") &&
        !isEqual(assignees, values)
      ) {
        await updateProjectAssignees({
          projectId: project?._id,
          companyId: company?._id,
          ...values,
        });

        await fetchProject();
      }
    } catch (caught) {
      console.error(caught);
      const { error = "There was an error updating this project" } = caught;

      notification({
        variant: "error",
        title: "Error updating project",
        message: error,
      });
    }

    setSaving(false);
  };

  const onClose = (form) => {
    const temp = { ...router.query };

    delete temp["update-project-assignees"];

    router.push({ pathname: router.pathname, query: temp });

    form.restart();
  };

  return (
    <Form
      onSubmit={onSave}
      initialValues={assignees}
      mutators={{ ...arrayMutators }}
      render={({ form, handleSubmit }) => {
        const onAddItem = () => {
          form.mutators.push("assignedCompanies", {
            companyId: undefined,
            permissions: defaultPermissions,
          });
        };
        return (
          <Slideout
            id="update-project-slideout"
            title="Update assignees"
            open={!!router.query["update-project-assignees"]}
            onClose={() => onClose(form)}
            saving={saving}
            dirty={form.getState().dirty}
            actions={[
              {
                text: "Save",
                onClick: handleSubmit,
                type: "submit",
              },
            ]}
          >
            <Field
              title="Assigned workers"
              name="assignedWorkers"
              component={SelectList}
              options={company?.workers.reduce((total, { _id, name }) => {
                return [...total, { value: _id, label: name }];
              }, [])}
              id="update-project-assigned-workers-select-list"
            />

            <Field
              title="Assigned teams"
              name="assignedTeams"
              component={SelectList}
              options={company?.teams.map(({ _id, name }) => ({
                value: _id,
                label: name,
              }))}
              id="update-project-assigned-teams-select-list"
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
                                title="Company"
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
          </Slideout>
        );
      }}
    />
  );
};

export default AssigneesSlideout;
