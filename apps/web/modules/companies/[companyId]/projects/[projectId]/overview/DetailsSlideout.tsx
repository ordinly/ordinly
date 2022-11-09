import { useContext, useMemo, useState, useEffect } from "react";

import { useRouter } from "next/router";

import { getPriorities, getStatuses } from "@ordinly/api-abstraction/projects";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { RichTextEditor } from "@components/RichTextEditor";
import { Select } from "@components/Select";
import {
  required,
  isEndDateLessThanStartDate,
} from "@components/Form/validation";

import ProjectContext from "@contexts/ProjectContext";
import NotificationContext from "@contexts/NotificationContext";

import { updateCompanyProjectDetails } from "@ordinly/api-abstraction/companies";

import DeleteProjectModal from "./DeleteProjectModal";

const now = new Date();

const DetailsSlideout = () => {
  const { project, fetchProject } = useContext(ProjectContext);
  const { notification } = useContext(NotificationContext);

  const [saving, setSaving] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);

  const details = useMemo(() => project, [project]);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { statuses: newStatuses } = await getStatuses();
      setStatuses(newStatuses);

      const { priorities: newPriorities } = await getPriorities();
      setPriorities(newPriorities);
    })();
  }, []);

  const closeSlideout = (form) => {
    const temp = router.query;

    delete temp["update-project-details"];

    if (form) {
      form.restart();
    }

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  const openDeleteProjectModal = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, "delete-project": true },
    });
  };

  const onSave = async (values, form) => {
    try {
      setSaving(true);

      await updateCompanyProjectDetails({
        ...values,
        companyId: router.query["companyId"],
        projectId: project._id,
      });

      await fetchProject();

      closeSlideout(form);
    } catch (caught) {
      const { error = "There was an error updating this project" } = caught;

      notification({
        variant: "error",
        title: "Error updating this project",
        message: error,
      });
    }

    setSaving(false);
  };

  return (
    <Form
      onSubmit={onSave}
      initialValues={details}
      render={({ form, handleSubmit }) => {
        return (
          <>
            <Slideout
              id="update-project-details-slideout"
              title="Project details"
              open={router?.query?.hasOwnProperty("update-project-details")}
              onClose={() => closeSlideout(form)}
              saving={saving}
              dirty={form.getState().dirty}
              actions={[
                {
                  id: "remove-project-button",
                  text: "Remove project",
                  variant: "danger",
                  onClick: openDeleteProjectModal,
                },
                {
                  id: "update-project-submit-button",
                  text: "Save",
                  onClick: handleSubmit,
                  type: "submit",
                },
              ]}
            >
              <Field
                title="Name"
                name="name"
                component={Input}
                validate={required}
                id="new-project-name-input"
              />

              <Field
                title="Description"
                name="description"
                component={RichTextEditor}
                id="new-project-description-input"
              />

              <Field
                title="Priority"
                name="priority"
                component={Select}
                options={priorities}
                validate={required}
                id="new-project-priority-select"
              />

              <Field
                title="Status"
                name="status"
                component={Select}
                options={statuses}
                validate={required}
                id="new-project-status-select"
              />

              <Field
                title="Start date"
                name="startDate"
                component={Input}
                validate={required}
                htmlType="date"
                initialValue={now}
                id="new-project-start-date-input"
                validateFields={["dueDate"]}
              />

              <Field
                title="Due date"
                name="dueDate"
                component={Input}
                htmlType="date"
                id="new-project-due-date-input"
                validate={isEndDateLessThanStartDate}
              />
            </Slideout>

            <DeleteProjectModal onClose={closeSlideout} />
          </>
        );
      }}
    />
  );
};

export default DetailsSlideout;
