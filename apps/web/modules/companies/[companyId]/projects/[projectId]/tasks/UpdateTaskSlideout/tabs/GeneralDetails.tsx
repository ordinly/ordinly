import { useEffect, useState, useCallback, useContext, useMemo } from "react";
import { useRouter } from "next/router";

import {
  getCompanyProjectCompanies,
  getCompanyTeams,
  getCompanyWorkers,
} from "@ordinly/api-abstraction/companies";
import { getPriorities, getStatuses } from "@ordinly/api-abstraction/projects";

import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { RichTextEditor } from "@components/RichTextEditor";
import { Select } from "@components/Select";
import { SearchSelect } from "@components/SearchSelect";

const now = new Date();

const GeneralDetailsTab = ({ disabled, form }) => {
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
        required
        component={Input}
        id="add-task-name-input"
        destroyOnUnregister={false}
        disabled={disabled}
      />

      <Field
        title="Description"
        name="description"
        component={RichTextEditor}
        id="add-task-description-RichTextEditor"
        destroyOnUnregister={false}
        disabled={disabled}
      />

      <Field
        title="Priority"
        name="priority"
        component={Select}
        options={priorities}
        id="new-task-priority-select"
        destroyOnUnregister={false}
        disabled={disabled}
      />

      <Field
        title="Status"
        name="status"
        component={Select}
        options={statuses}
        id="new-task-status-select"
        destroyOnUnregister={false}
        disabled={disabled}
      />

      <Field
        title="Assigned company"
        name="assignedCompany"
        component={SearchSelect}
        id="new-task-company-select"
        entity="companies"
        onFetchData={fetchCompanies}
        destroyOnUnregister={false}
        disabled={disabled}
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
            disabled={disabled}
          />

          <Field
            title="Assigned worker"
            name="assignedWorker"
            component={SearchSelect}
            id="new-task-worker-select"
            entity="workers"
            onFetchData={fetchWorkers}
            disabled={disabled}
          />
        </>
      ) : null}

      <Field
        title="Start date"
        name="startDate"
        component={Input}
        htmlType="date"
        initialValue={now}
        id="new-task-start-date-input"
        destroyOnUnregister={false}
        disabled={disabled}
      />

      <Field
        title="Due date"
        name="dueDate"
        component={Input}
        htmlType="date"
        id="add-task-due-date-input"
        destroyOnUnregister={false}
        disabled={disabled}
      />
    </>
  );
};

export default GeneralDetailsTab;
