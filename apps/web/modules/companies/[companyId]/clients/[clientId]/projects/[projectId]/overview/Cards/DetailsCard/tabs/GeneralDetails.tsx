import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";

import { Select } from "@components/Select";

import { required } from "@components/Form/validation";

const projectStatuses = [
  { value: "Proposal", label: "Proposal" },
  { value: "Not started", label: "Not started" },
  { value: "On hold", label: "On hold" },
  { value: "In progress", label: "In progress" },
  { value: "Complete", label: "Complete" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Rejected", label: "Rejected" },
];

const projectPriorities = [
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
];

const now = new Date();

const GeneralDetailsTab = () => {
  return (
    <>
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
        component={TextArea}
        id="new-project-description-input"
      />

      <Field
        title="Priority"
        name="priority"
        component={Select}
        options={projectPriorities}
        validate={required}
        id="new-project-priority-select"
      />

      <Field
        title="Status"
        name="status"
        component={Select}
        options={projectStatuses}
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
      />

      <Field
        title="Due date"
        name="dueDate"
        component={Input}
        htmlType="date"
        id="new-project-due-date-input"
      />
    </>
  );
};

export default GeneralDetailsTab;
