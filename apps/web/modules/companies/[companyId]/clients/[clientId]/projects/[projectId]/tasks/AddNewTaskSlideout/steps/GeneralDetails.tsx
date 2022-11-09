import { useContext } from "react";

import { useRouter } from "next/router";

import CompanyContext from "@contexts/CompanyContext";

import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { SelectList } from "@components/List";
import { Select } from "@components/Select";
import { TextArea } from "@components/TextArea";

import { required } from "@components/Form/validation";

const taskStatuses = [
  { value: "Proposal", label: "Proposal" },
  { value: "Not started", label: "Not started" },
  { value: "On hold", label: "On hold" },
  { value: "In progress", label: "In progress" },
  { value: "Complete", label: "Complete" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Rejected", label: "Rejected" },
];

const taskPriorities = [
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
];

const now = new Date();

const GeneralDetailsStep = () => {
  const router = useRouter();

  const { company } = useContext(CompanyContext);

  return (
    <>
      <Field
        title="Name"
        name="name"
        component={Input}
        validate={required}
        id="add-task-name-input"
      />

      <Field
        title="Description"
        name="description"
        component={TextArea}
        id="add-task-description-textarea"
      />

      <Field
        title="Priority"
        name="priority"
        component={Select}
        options={taskPriorities}
        validate={required}
        id="new-task-priority-select"
      />

      <Field
        title="Status"
        name="status"
        component={Select}
        options={taskStatuses}
        validate={required}
        id="new-task-status-select"
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

      <Field
        title="Assigned workers"
        name="assignedWorkers"
        component={SelectList}
        options={company?.workers.reduce((total, { _id, name, status }) => {
          if (status === "active") {
            return [...total, { value: _id, label: name }];
          }

          return total;
        }, [])}
        id="add-task-assigned-workers-select-list"
      />

      <Field
        title="Assigned teams"
        name="assignedTeams"
        component={SelectList}
        options={company?.teams.map(({ _id, name }) => ({
          value: _id,
          label: name,
        }))}
        id="add-task-assigned-teams-select-list"
      />
    </>
  );
};

export default GeneralDetailsStep;
