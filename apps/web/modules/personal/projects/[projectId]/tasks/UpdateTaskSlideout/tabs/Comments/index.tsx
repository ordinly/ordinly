import { useContext, useState } from "react";

import { useRouter } from "next/router";

import UserContext from "@contexts/UserContext";

import formatDate from "@util/formatDate";

import { FieldArray, Field } from "@components/Field";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { FileUpload } from "@components/FileUpload";
import { Separator } from "@components/Separator";

import styles from "./Comments.module.css";

const CommentsTab = ({ push }) => {
  const { user } = useContext(UserContext);

  const [newComment, setNewComment] = useState("");

  const router = useRouter();

  const onAddNewComment = () => {
    push("comments", {
      text: newComment,
      user: { name: user.name, _id: user?._id },
    });

    setNewComment("");
  };

  return (
    <>
      <Field
        title="Files"
        name="files"
        component={FileUpload}
        id="update-task-file-upload"
        getHref={(fileId) =>
          `/api/user/projects/${router.query["projectId"]}/tasks/${router.query["task-id"]}/files/${fileId}`
        }
      />

      <Separator />

      <label className={styles.title}>Comments</label>
      <FieldArray name="comments">
        {({ fields }) => (
          <ul>
            {fields?.length ? (
              fields.map((name, index) => (
                <li className={styles.container}>
                  <h5 className={styles.user}>
                    {fields.value[index]?.user?.name}{" "}
                    <span className={styles.date}>
                      {fields.value[index].createdDate
                        ? formatDate(fields.value[index].createdDate)
                        : "Pending"}
                      {}
                    </span>
                  </h5>

                  <p className={styles.text}>{fields.value[index].text}</p>

                  {user._id === fields.value[index]?.user?._id && (
                    <div className={styles.button}>
                      <Button
                        icon="trash"
                        variant="ghost"
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
