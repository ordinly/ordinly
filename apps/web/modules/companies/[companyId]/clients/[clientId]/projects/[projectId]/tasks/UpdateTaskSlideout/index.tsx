import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import arrayMutators from "final-form-arrays";

import { isEqual } from "lodash";

import CompanyContext from "@contexts/CompanyContext";
import ProjectContext from "@contexts/ProjectContext";
import NotificationContext from "@contexts/NotificationContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Button } from "@components/Button";
import { Modal } from "@components/Modal";

import { updateTask, removeTask } from "@ordinly/api-abstraction/companies";

import { required } from "@components/Form/validation";

import GeneralDetailsTab from "./tabs/GeneralDetails";
import CommentsTab from "./tabs/Comments";
import SubtasksTab from "./tabs/Subtasks";
import FilesTab from "./tabs/Files";

import styles from "./UpdateTaskSlideout.module.css";

const UpdateTaskSlideout = () => {
  const [saving, setSaving] = useState(false);
  const [task, setTask] = useState(null);

  const { company } = useContext(CompanyContext);
  const { project, fetchProject } = useContext(ProjectContext);
  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  useEffect(() => {
    if (
      !task ||
      !isEqual(
        task,
        project?.tasks.find(({ _id }) => _id === router.query["task-id"])
      )
    ) {
      setTask(
        project?.tasks.find(({ _id }) => _id === router.query["task-id"])
      );
    }
  }, [project, router.query]);

  const onSave = async (values) => {
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
        taskId: task?._id,
        companyId: router.query["companyId"] as string,
        clientId: router.query["clientId"] as string,
        projectId: router.query["projectId"] as string,
        newFiles,
        existingFiles,
        ...rest,
      });

      await fetchProject();
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

  const onClose = () => {
    const temp = { ...router.query };

    delete temp["update-task"];
    delete temp["task-id"];
    delete temp["tab"];

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
      if (task && project && company) {
        await removeTask({
          taskId: task?._id,
          companyId: router.query["companyId"] as string,
          clientId: router.query["clientId"] as string,
          projectId: router.query["projectId"] as string,
        });

        await fetchProject();

        onCloseRemoveTaskModal();

        const temp = { ...router.query };

        delete temp["update-task"];
        delete temp["task-id"];
        delete temp["tab"];
        delete temp["remove-task-modal"];

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

  return (
    <Form
      onSubmit={onSave}
      initialValues={project?.tasks.find(
        ({ _id }) => _id === router.query["task-id"]
      )}
      mutators={{ ...arrayMutators }}
      validate={(values) => {
        const errors: { [key: string]: any } = { subtasks: [] };

        errors.name = required(values.name);

        for (let i = 0; i < values?.subtasks?.length; i++) {
          errors.subtasks.push({});
          errors.subtasks[i].name = required(
            values.subtasks[i] ? values.subtasks[i].name : values.subtasks[i]
          );
        }

        return errors;
      }}
      render={({ form, handleSubmit }) => {
        return (
          <>
            <Slideout
              id="update-task-slideout"
              title="Update task"
              open={!!router.query["update-task"]}
              onClose={onClose}
              saving={saving}
              dirty={form.getState().dirty}
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
                  error: form?.getState()?.errors.name,
                },
                { id: "files-tab", text: "Assignees", content: <FilesTab /> },
                {
                  id: "subtasks-tab",
                  text: "Subtasks",
                  content: (
                    <SubtasksTab
                      onAddSubtask={() =>
                        form.mutators.push("subtasks", undefined)
                      }
                    />
                  ),
                  error: form
                    .getState()
                    ?.errors?.subtasks?.some((subtask) => subtask?.name),
                },
                {
                  id: "comments-tab",
                  text: "Comments",
                  content: (
                    <CommentsTab
                      onAddComment={(newComment) =>
                        form.mutators.push("comments", newComment)
                      }
                    />
                  ),
                },
                { id: "files-tab", text: "Files", content: <FilesTab /> },
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
                Are you sure you want to remove the{" "}
                <span className={styles.bold}>{task?.name}</span> task?
              </p>
            </Modal>
          </>
        );
      }}
    />
  );
};

export default UpdateTaskSlideout;
