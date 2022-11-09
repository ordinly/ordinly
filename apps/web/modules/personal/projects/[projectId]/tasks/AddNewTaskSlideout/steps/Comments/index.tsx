import { useContext, useState } from "react";

import { useRouter } from "next/router";

import { FieldArray } from "@components/Field";
import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { FileUpload } from "@components/FileUpload";
import { Separator } from "@components/Separator";

import UserContext from "@contexts/UserContext";

import styles from "./Comments.module.css";

const CommentsPage = ({ push }) => {
  const router = useRouter();

  const [newComment, setNewComment] = useState(undefined);

  const { user } = useContext(UserContext);

  const onAddNewComment = () => {
    push("comments", newComment);

    setNewComment("");
  };

  return (
    <>
      <Field
        title="Files"
        name="files"
        component={FileUpload}
        id="update-task-file-upload"
      />

      <Separator />

      <label>Comments</label>
      <FieldArray title="Comments" name="comments">
        {({ fields }) => (
          <ul>
            {fields?.length ? (
              fields.map((name, index) => (
                <li className={styles.container}>
                  <h5 className={styles.user}>{user.name}</h5>

                  <p className={styles.text}>{fields.value[index]}</p>

                  <div className={styles.button}>
                    <Button
                      icon="trash"
                      variant="ghost"
                      onClick={() => fields.remove(index)}
                    />
                  </div>
                </li>
              ))
            ) : (
              <p className={styles.noItems}>No comments to display</p>
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
            text="Add comment"
            icon="add"
            onClick={onAddNewComment}
            disabled={!newComment}
          />
        </div>
      </div>
    </>
  );
};

export default CommentsPage;
