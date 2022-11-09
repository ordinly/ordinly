import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

import { getPriorities, getStatuses } from "@ordinly/api-abstraction";
import {
  getCompanyProjectCompanies,
  getCompanyTeams,
  getCompanyWorkers,
} from "@ordinly/api-abstraction";

import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { Select } from "@components/Select";
import { RichTextEditor } from "@components/RichTextEditor";
import { SearchSelect } from "@components/SearchSelect";

import { required } from "@components/Form/validation";

const now = new Date();

const GeneralDetailsStep = ({ form }) => {
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

  const fetchCompanies = useCallback(() => {
    if (router.query["companyId"] && router.query["projectId"]) {
      return getCompanyProjectCompanies({
        companyId: router.query["companyId"] as string,
        projectId: router.query["projectId"] as string,
      });
    }
  }, [router.query["companyId"], router.query["projectId"]]);

  const fetchTeams = useCallback(() => {
    if (router.query["companyId"]) {
      return getCompanyTeams({
        companyId: router.query["companyId"],
      });
    }
  }, [router.query["companyId"]]);

  const fetchWorkers = useCallback(() => {
    if (router.query["companyId"]) {
      return getCompanyWorkers({
        companyId: router.query["companyId"],
      });
    }
  }, [router.query["companyId"]]);

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

      <Field
        title="Assigned company"
        name="assignedCompany"
        initialValue={router.query["companyId"]}
        component={SearchSelect}
        id="new-task-company-select"
        entity="companies"
        onFetchData={fetchCompanies}
      />

      {form?.getFieldState("assignedCompany")?.value ===
      router?.query["companyId"] ? (
        <>
          <Field
            title="Assigned team"
            name="assignedTeam"
            component={SearchSelect}
            id="new-task-team-select"
            entity="teams"
            onFetchData={fetchTeams}
          />

          <Field
            title="Assigned worker"
            name="assignedWorker"
            component={SearchSelect}
            id="new-task-worker-select"
            entity="workers"
            onFetchData={fetchWorkers}
          />
        </>
      ) : null}

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
