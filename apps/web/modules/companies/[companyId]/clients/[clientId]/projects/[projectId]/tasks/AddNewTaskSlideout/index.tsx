import { useContext, useState } from "react";

import { useRouter } from "next/router";

import arrayMutators from "final-form-arrays";

import CompanyContext from "@contexts/CompanyContext";
import ProjectContext from "@contexts/ProjectContext";
import NotificationContext from "@contexts/NotificationContext";

import { Form } from "@components/Form";
import { Slideout } from "@components/Slideout";

import { addTask } from "@ordinly/api-abstraction/companies";

import GeneralDetailsStep from "./steps/GeneralDetails";
import SubtasksStep from "./steps/Subtasks";
import CommentsStep from "./steps/Comments";
import FilesStep from "./steps/Files";

const AddNewTaskSlideout = () => {
  const { company } = useContext(CompanyContext);
  const { project, fetchProject } = useContext(ProjectContext);
  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      if (Number(router.query["step"]) < 3) {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, step: Number(router.query["step"]) + 1 },
        });
      } else {
        await addTask({
          projectId: project._id,
          clientId: router.query["clientId"],
          companyId: company._id,
          ...values,
        });

        await fetchProject();

        onClose();
      }
    } catch (caught) {
      const { error = "There was an error adding this task" } = caught;

      notification({
        variant: "error",
        title: "Error adding task",
        message: error,
      });
    }
  };

  const onClose = () => {
    const temp = { ...router.query };

    delete temp["add-task"];
    delete temp["step"];

    router.push({ pathname: router.pathname, query: temp });
  };

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{ ...arrayMutators }}
      render={({
        form: {
          mutators: { push },
        },
        handleSubmit,
      }) => {
        return (
          <Slideout
            id="add-task-slideout"
            title="Add task"
            open={!!router.query["add-task"]}
            onClose={() => onClose()}
            steps={[
              {
                text: "General details",
                content: <GeneralDetailsStep />,
              },
              {
                text: "Assignees",
                content: <GeneralDetailsStep />,
              },
              {
                text: "Subtasks",
                content: <SubtasksStep push={push} />,
              },
              {
                text: "Comments",
                content: <CommentsStep push={push} />,
              },
              {
                text: "Files",
                content: <FilesStep />,
              },
            ]}
            actions={[
              {
                id: "submit-task-button",
                text: Number(router.query["step"]) === 3 ? "Add task" : "Next",
                onClick: handleSubmit,
                type: "submit" as "submit",
              },
            ]}
          />
        );
      }}
    />
  );
};

export default AddNewTaskSlideout;
