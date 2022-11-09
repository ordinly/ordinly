import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import arrayMutators from "final-form-arrays";

import {
  updateTask,
  removeTask,
  getUserProjectTask,
} from "@ordinly/api-abstraction/users";

import NotificationContext from "@contexts/NotificationContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Modal } from "@components/Modal";

import GeneralDetailsTab from "./tabs/GeneralDetails";
import CommentsTab from "./tabs/Comments";
import TodoTab from "./tabs/Todo";

import styles from "./UpdateTaskSlideout.module.css";

const UpdateTaskSlideout = ({ onSubmit: onSubmitProp, tasks }) => {
  const [saving, setSaving] = useState(false);
  const [task, setTask] = useState(null);

  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (router.query["task-id"]) {
        const response = await getUserProjectTask({
          projectId: router.query["projectId"] as string,
          taskId: router.query["task-id"] as string,
        });

        const { message, task: newTask } = response;

        console.log(response);

        setTask(newTask);
      }
    })();
  }, [router.query["projectId"], router.query["task-id"]]);

  const onSave = async (values, form) => {
    setSaving(true);

    const { files, ...rest } = values;

    const newFiles = [];
    const existingFiles = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file instanceof Blob) {
          newFiles.push(file);
        } else {
          existingFiles.push(file);
        }
      }
    }

    try {
      await updateTask({
        taskId: router.query["task-id"],
        projectId: router.query["projectId"] as string,
        newFiles,
        existingFiles,
        ...rest,
      });

      await onSubmitProp();

      onClose(form);
    } catch (caught) {
      console.error(caught);
      const { error = "There was an error updating this task" } = caught;

      notification({
        variant: "error",
        title: "Error updating task",
        message: error,
      });
    }

    setSaving(false);
  };

  const onClose = (form?: any) => {
    const temp = { ...router.query };

    delete temp["update-task"];
    delete temp["task-id"];
    delete temp["tab"];

    if (form) {
      form.restart();
    }

    router.push({ pathname: router.pathname, query: temp });
  };

  const onOpenRemoveTaskModal = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "remove-task-modal": true,
      },
    });
  };

  const onCloseRemoveTaskModal = () => {
    const temp = { ...router.query };

    delete temp["remove-task-modal"];

    router.push({ pathname: router.pathname, query: temp });
  };

  const onRemoveTask = async () => {
    try {
      if (router.query["task-id"] && router.query["projectId"]) {
        await removeTask({
          taskId: router.query["task-id"] as string,
          projectId: router.query["projectId"] as string,
        });

        onCloseRemoveTaskModal();

        const temp = { ...router.query };

        delete temp["update-task"];
        delete temp["task-id"];
        delete temp["tab"];
        delete temp["remove-task-modal"];

        onSubmitProp();

        router.push({ pathname: router.pathname, query: temp });
      }
    } catch (caught) {
      console.error(caught);
      const { error = "There was an error removing this task" } = caught;

      notification({
        variant: "error",
        title: "Error removing task",
        message: error,
      });
    }
  };

  console.log("TASK", task);

  return (
    <>
      {task ? (
        <Form
          onSubmit={onSave}
          initialValues={task}
          mutators={{ ...arrayMutators }}
          render={({
            form: {
              getState,
              mutators: { push, remove },
            },
            handleSubmit,
          }) => {
            return (
              <>
                <Slideout
                  id="update-task-slideout"
                  title="Task details"
                  open={!!router.query["update-task"]}
                  onClose={() => onClose()}
                  saving={saving}
                  dirty={getState().dirty}
                  actions={[
                    {
                      text: "Remove task",
                      variant: "danger",
                      onClick: onOpenRemoveTaskModal,
                    },
                    {
                      text: "Save",
                      onClick: handleSubmit,
                      type: "submit",
                    },
                  ]}
                  tabs={[
                    {
                      id: "details-tab",
                      text: "General details",
                      content: <GeneralDetailsTab />,
                    },
                    {
                      id: "todo-tab",
                      text: "To do",
                      content: (
                        <TodoTab push={push} remove={remove} tasks={tasks} />
                      ),
                    },
                    {
                      id: "comments-tab",
                      text: "Comments & Files",
                      content: <CommentsTab push={push} />,
                    },
                  ]}
                />

                <Modal
                  id="remove-task-modal"
                  title="Remove task?"
                  onClose={onCloseRemoveTaskModal}
                  open={!!router?.query["remove-task-modal"]}
                  actions={[
                    {
                      text: "Remove task",
                      onClick: onRemoveTask,
                      variant: "danger",
                    },
                  ]}
                >
                  <p className={styles.modalText}>
                    Are you sure you want to remove{" "}
                    <span className={styles.bold}>{task?.name}</span>?
                  </p>
                </Modal>
              </>
            );
          }}
        />
      ) : null}
    </>
  );
};

export default UpdateTaskSlideout;
