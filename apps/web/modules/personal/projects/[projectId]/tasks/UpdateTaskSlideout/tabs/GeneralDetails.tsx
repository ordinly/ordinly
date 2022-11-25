import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

import { getUserProjectCompanies } from "@ordinly/api-abstraction";

import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { MultiSelect } from "@components/MultiSelect";
import { Select } from "@components/Select";
import { RichTextEditor } from "@components/RichTextEditor";
import { SearchSelect } from "@components/SearchSelect";

import { getPriorities, getStatuses } from "@ordinly/api-abstraction";

const now = new Date();

const GeneralDetailsTab = () => {
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

  const onFetchData = useCallback(
    async (values) => {
      return await getUserProjectCompanies({
        ...values,
        projectId: router.query["projectId"] as string,
      });
    },
    [router.query["projectId"]]
  );

  return (
    <>
      <Field
        title="Name"
        name="name"
        required
        component={Input}
        id="add-task-name-input"
        destroyOnUnregister={false}
      />

      <Field
        title="Description"
        name="description"
        component={RichTextEditor}
        id="add-task-description-textarea"
        destroyOnUnregister={false}
      />

      <Field
        title="Priority"
        name="priority"
        component={Select}
        options={priorities}
        id="new-task-priority-select"
        destroyOnUnregister={false}
      />

      <Field
        title="Status"
        name="status"
        component={Select}
        options={statuses}
        id="new-task-status-select"
        destroyOnUnregister={false}
        clearable
      />

      {router?.query["companyId"] ? (
        <Field
          title="Workers"
          name="workers"
          component={MultiSelect}
          options={[]}
          id="new-task-workers-select"
          destroyOnUnregister={false}
        />
      ) : null}

      <Field
        title="Assigned company"
        name="assignedCompany"
        component={SearchSelect}
        id="new-task-company-select"
        destroyOnUnregister={false}
        onFetchData={onFetchData}
        entity="companies"
      />

      <Field
        title="Start date"
        name="startDate"
        component={Input}
        htmlType="date"
        initialValue={now}
        id="new-task-start-date-input"
        destroyOnUnregister={false}
      />

      <Field
        title="Due date"
        name="dueDate"
        component={Input}
        htmlType="date"
        id="add-task-due-date-input"
        destroyOnUnregister={false}
      />
    </>
  );
};

export default GeneralDetailsTab;
