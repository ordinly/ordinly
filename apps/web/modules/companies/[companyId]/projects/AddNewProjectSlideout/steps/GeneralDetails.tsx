import { useEffect, useState, useContext, useCallback } from "react";

import { useRouter } from "next/router";

import { getCompanyClients } from "@ordinly/api-abstraction";

import CompanyContext from "@contexts/CompanyContext";

import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { RichTextEditor } from "@components/RichTextEditor";
import { Select } from "@components/Select";
import { SearchSelect } from "@components/SearchSelect";

import {
  required,
  isEndDateLessThanStartDate,
} from "@components/Form/validation";

import { getPriorities, getStatuses } from "@ordinly/api-abstraction";

const now = new Date();

const GeneralDetailsStep = () => {
  const router = useRouter();

  const { company } = useContext(CompanyContext);

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

  const fetchClients = useCallback(() => {
    if (company?._id) {
      return getCompanyClients({ companyId: company?._id });
    }
  }, [company]);

  return (
    <>
      <Field
        title="Name"
        name="name"
        required
        component={Input}
        id="new-project-name-input"
      />

      <Field
        title="Description"
        name="description"
        component={RichTextEditor}
        id="new-project-description-input"
      />

      {!router.query["clientId"] ? (
        <Field
          title="Client"
          name="clientId"
          component={SearchSelect}
          id="new-project-invitations-select"
          onFetchData={fetchClients}
          entity="clients"
        />
      ) : null}

      <Field
        title="Priority"
        name="priority"
        component={Select}
        options={priorities}
        validate={required}
        initialValue="Medium"
        id="new-project-priority-select"
      />

      <Field
        title="Status"
        name="status"
        component={Select}
        options={statuses}
        validate={required}
        initialValue="In progress"
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
    </>
  );
};

export default GeneralDetailsStep;
