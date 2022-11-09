import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

import { getUserProjectCompanies } from "@ordinly/api-abstraction";

import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { Select } from "@components/Select";
import { RichTextEditor } from "@components/RichTextEditor";
import { MultiSelect } from "@components/MultiSelect";
import { SearchSelect } from "@components/SearchSelect";

import { getPriorities, getStatuses } from "@ordinly/api-abstraction";

import { required } from "@components/Form/validation";

const now = new Date();

const GeneralDetailsStep = () => {
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    (async () => {
      const { statuses: newStatuses } = await getStatuses();
      setStatuses(newStatuses);

      const { priorities: newPriorities } = await getPriorities();
      setPriorities(newPriorities);
    })();
  }, []);

  const router = useRouter();

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    (async () => {
      if (router.query.projectId) {
        const { companies: newCompanies } = await getUserProjectCompanies({
          projectId: router.query.projectId as string,
        });

        setCompanies(
          newCompanies?.map(({ name, _id }) => ({
            label: name,
            value: _id,
          }))
        );
      }
    })();
  }, [router.query.projectId]);

  const onFetchData = useCallback(
    async (values) => {
      return await getUserProjectCompanies({
        ...values,
        projectId: router.query["projectId"],
      });
    },
    [router.query["projectId"]]
  );

  return (
    <>
      <Field
        title="Name"
        name="name"
        component={Input}
        validate={required}
        required
        id="add-task-name-input"
      />

      <Field
        title="Description"
        name="description"
        component={RichTextEditor}
        id="add-task-description-textarea"
      />

      <Field
        title="Priority"
        name="priority"
        component={Select}
        options={priorities}
        id="new-task-priority-select"
      />

      <Field
        title="Status"
        name="status"
        component={Select}
        options={statuses}
        id="new-task-status-select"
      />

      {router?.query["companyId"] ? (
        <Field
          title="Workers"
          name="workers"
          component={MultiSelect}
          options={[]}
          id="new-task-workers-select"
        />
      ) : null}

      <Field
        title="Assigned company"
        name="assignedCompany"
        component={SearchSelect}
        options={companies}
        id="new-task-company-select"
        onFetchData={onFetchData}
        entity="companies"
      />

      <Field
        title="Start date"
        name="startDate"
        component={Input}
        validate={required}
        htmlType="date"
        initialValue={now}
        id="new-task-start-date-input"
      />

      <Field
        title="Due date"
        name="dueDate"
        component={Input}
        htmlType="date"
        id="add-task-due-date-input"
      />
    </>
  );
};

export default GeneralDetailsStep;
