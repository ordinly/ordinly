import { useContext, useState } from "react";

import { FieldArray } from "@components/Field";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import formatDate from "@util/formatDate";

import UserContext from "@contexts/UserContext";

import styles from "./Notes.module.css";

const NotesPage = ({ push, disabled }: { disabled?: boolean; push: any }) => {
  const [newNote, setNewNote] = useState(undefined);

  const { user } = useContext(UserContext);

  const onAddNewNote = () => {
    push("notes", newNote);

    setNewNote("");
  };

  return (
    <>
      <FieldArray name="notes">
        {({ fields }) => (
          <ul>
            {fields?.length ? (
              fields.map((name, index) => (
                <li className={styles.container}>
                  <h5 className={styles.user}>
                    {typeof fields.value[index] === "string" ? (
                      <>
                        {user.name}
                        <span className={styles.date}>Pending</span>
                      </>
                    ) : (
                      <>
                        {fields.value[index].user?.name}{" "}
                        <span className={styles.date}>
                          {formatDate(fields.value[index].createdDate)}
                        </span>
                      </>
                    )}
                  </h5>

                  <p className={styles.text}>
                    {typeof fields.value[index] === "string"
                      ? fields.value[index]
                      : fields.value[index].text}
                  </p>

                  {user._id === fields.value[index].user?._id && (
                    <div className={styles.button}>
                      <Button
                        text="Remove note"
                        variant="danger"
                        disabled={disabled}
                        onClick={() => fields.remove(index)}
                      />
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p className={styles.noItems}>No notes to display</p>
            )}
          </ul>
        )}
      </FieldArray>

      <div className={styles.inputContainer}>
        <span className={styles.input}>
          <Input value={newNote} onChange={setNewNote} disabled={disabled} />
        </span>
        <div>
          <Button
            text="Add note"
            icon="add"
            onClick={onAddNewNote}
            disabled={!newNote || disabled}
          />
        </div>
      </div>
    </>
  );
};

export default NotesPage;
