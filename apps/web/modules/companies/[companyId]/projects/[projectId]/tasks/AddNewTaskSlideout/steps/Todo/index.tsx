import { useEffect, useState } from "react";

import { FieldArray } from "@components/Field";
import { Button } from "@components/Button";
import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { Checkbox } from "@components/Checkbox";
import { Select } from "@components/Select";
import { Separator } from "@components/Separator";

import { required } from "@components/Form/validation";

import styles from "./Todo.module.css";

const relationshipTypes = [
  { label: "Subtask", value: "Subtask" },
  { label: "Parent", value: "Parent" },
  { label: "Blocks", value: "Blocks" },
  { label: "Is blocked by", value: "Is blocked by" },
];

const SubtaskStep = ({ push, remove, tasks }) => {
  const onAddChecklistItem = () => {
    push("checklist", { name: "", complete: false });
  };

  const onRemoveChecklistItem = (index) => {
    remove("checklist", index);
  };

  const onAddRelationshipItem = () => {
    push("relationships", { name: "", complete: false });
  };

  const onRemoveRelationshipItem = (index) => {
    remove("relationships", index);
  };

  return (
    <>
      <p className={styles.label}>Checklist</p>

      <FieldArray title="Checklist" name="checklist">
        {({ fields }) => (
          <>
            {fields?.length ? (
              fields.map((name, index) => (
                <div className={styles.itemContainer}>
                  <div>
                    <Field
                      inline
                      hideErrorMessage
                      name={`${name}.complete`}
                      component={Checkbox}
                      id="new-subtask-item-complete-checkbox"
                    />
                  </div>

                  <Field
                    inline
                    hideErrorMessage
                    name={`${name}.name`}
                    component={Input}
                    validate={required}
                    id="new-subtask-item-name-input"
                  />

                  <div>
                    <Button
                      onClick={() => onRemoveChecklistItem(index)}
                      variant="ghost"
                      danger
                      icon="close"
                      size="inline"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noItems}>No checklist items to display</p>
            )}
          </>
        )}
      </FieldArray>

      <Button
        text="Add checklist item"
        onClick={onAddChecklistItem}
        variant="outline"
        icon="add"
        size="small"
      />

      <Separator />

      <p className={styles.label}>Relationships</p>

      <FieldArray title="Relationships" name="relationships">
        {({ fields }) => (
          <>
            {fields?.length ? (
              fields.map((name, index) => (
                <div className={styles.itemContainer}>
                  <div>
                    <Field
                      inline
                      hideErrorMessage
                      name={`${name}.variant`}
                      component={Select}
                      options={relationshipTypes}
                      initialValue={"Subtask"}
                      validate={required}
                      id={`new-related-task-${index}-type`}
                    />
                  </div>

                  <Field
                    inline
                    hideErrorMessage
                    name={`${name}.taskId`}
                    component={Select}
                    options={
                      tasks?.map(({ _id, name }) => ({
                        label: name,
                        value: _id,
                      })) ?? []
                    }
                    validate={required}
                    id={`new-related-task-${index}-task-id`}
                  />

                  <div>
                    <Button
                      onClick={() => onRemoveRelationshipItem(index)}
                      variant="ghost"
                      danger
                      icon="close"
                      size="inline"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noItems}>No related tickets to display</p>
            )}
          </>
        )}
      </FieldArray>

      <Button
        text="Add relationship"
        onClick={onAddRelationshipItem}
        variant="outline"
        icon="add"
        size="small"
      />
    </>
  );
};

export default SubtaskStep;
