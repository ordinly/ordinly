import { Field } from "@components/Field";

import { SelectList } from "@components/List";

const AssigneesTab = ({ company }) => {
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
    </>
  );
};

export default AssigneesTab;
