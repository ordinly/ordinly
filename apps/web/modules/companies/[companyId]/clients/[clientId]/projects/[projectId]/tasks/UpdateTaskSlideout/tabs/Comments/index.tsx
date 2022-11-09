import { useContext, useState } from "react";

import { useRouter } from "next/router";

import ProjectContext from "@contexts/ProjectContext";
import UserContext from "@contexts/UserContext";

import formatDate from "@util/formatDate";

import { FieldArray, Field } from "@components/Field";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { FileUpload } from "@components/FileUpload";

import styles from "./Comments.module.css";

const CommentsTab = ({ onAddComment }) => {
  const { fetchProject } = useContext(ProjectContext);
  const { user } = useContext(UserContext);

  const [newComment, setNewComment] = useState("");

  const router = useRouter();

  const onAddNewComment = async () => {
    if (newComment) {
      await onAddComment({
        userId: user._id,
        user: user.name,
        text: newComment,
      });

      setNewComment("");
    }
  };

  return (
    <>
      <Field
        title="Files"
        name="files"
        component={FileUpload}
        id="update-task-file-upload"
        getHref={(fileId) =>
          `/api/company/${router.query["companyId"] as string}/clients/${
            router.query["clientId"] as string
          }/projects/${router.query["projectId"] as string}/tasks/${
            router.query["task-id"] as string
          }/files/${fileId}`
        }
      />

      <label className={styles.title}>Comments</label>
      <FieldArray name="comments">
        {({ fields }) => (
          <ul>
            {fields?.length ? (
              fields.map((name, index) => (
                <li className={styles.container}>
                  {console.log(fields.value)}
                  <h5 className={styles.user}>
                    {fields.value[index].user}{" "}
                    <span className={styles.date}>
                      {fields.value[index].createdDate
                        ? formatDate(fields.value[index].createdDate)
                        : "Pending"}
                      {}
                    </span>
                  </h5>

                  <p className={styles.text}>{fields.value[index].text}</p>

                  {user._id === fields.value[index].userId && (
                    <div className={styles.button}>
                      <Button
                        text="Remove comment"
                        variant="danger"
                        onClick={() => fields.remove(index)}
                      />
                    </div>
                  )}
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
          <Input
            value={newComment}
            onChange={(newValue) => setNewComment(newValue)}
          />
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

export default CommentsTab;
