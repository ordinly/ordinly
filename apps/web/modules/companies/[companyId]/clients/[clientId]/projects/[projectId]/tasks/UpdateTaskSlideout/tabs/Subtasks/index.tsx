import { useRouter } from "next/router";

import { FieldArray } from "@components/Field";
import { Button } from "@components/Button";

import Subtask from "./Subtask";

import styles from "./Subtasks.module.css";

const SubtaskTab = ({ onAddSubtask }) => {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.sectionTitle}>Subtasks</p>

        <FieldArray name="subtasks">
          {({ fields }) => (
            <>
              {fields?.length ? (
                fields.map((name, index) => (
                  <Subtask
                    name={name}
                    onRemoveSubtask={() => fields.remove(index)}
                  />
                ))
              ) : (
                <p className={styles.noItems}>No subtasks to display</p>
              )}
            </>
          )}
        </FieldArray>
      </div>

      <div className={styles.summary}>
        <div>
          <Button
            text="Add another subtask"
            onClick={onAddSubtask}
            variant="outline"
            icon="add"
            size="small"
          />
        </div>
      </div>
    </>
  );
};

export default SubtaskTab;
