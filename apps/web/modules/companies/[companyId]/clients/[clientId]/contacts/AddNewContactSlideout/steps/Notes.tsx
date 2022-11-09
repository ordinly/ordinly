import { useContext, useState } from "react";

import { FieldArray } from "@components/Field";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import UserContext from "@contexts/UserContext";

import styles from "./Notes.module.css";

const NotesPage = ({ push }) => {
  const [newComment, setNewComment] = useState(undefined);

  const { user } = useContext(UserContext);

  const onAddNewComment = () => {
    push("notes", newComment);

    setNewComment("");
  };

  return (
    <>
      <FieldArray name="notes">
        {({ fields }) => (
          <ul>
            {fields?.length ? (
              fields.map((name, index) => (
                <li className={styles.container}>
                  {console.log(fields.value)}
                  <h5 className={styles.user}>{user.name}</h5>

                  <p className={styles.text}>{fields.value[index]}</p>

                  <div className={styles.button}>
                    <Button
                      text="Remove note"
                      variant="danger"
                      onClick={() => fields.remove(index)}
                    />
                  </div>
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
          <Input value={newComment} onChange={setNewComment} />
        </span>
        <div>
          <Button
            text="Add note"
            icon="add"
            onClick={onAddNewComment}
            disabled={!newComment}
          />
        </div>
      </div>
    </>
  );
};

export default NotesPage;
