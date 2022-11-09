import { useContext } from "react";

import { useRouter } from "next/router";

import arrayMutators from "final-form-arrays";

import ProjectContext from "@contexts/ProjectContext";
import NotificationContext from "@contexts/NotificationContext";

import { Form } from "@components/Form";
import { Slideout } from "@components/Slideout";

import { createCompanyProjectTask } from "@ordinly/api-abstraction/companies";

import GeneralDetailsStep from "./steps/GeneralDetails";
import TodoStep from "./steps/Todo";
import CommentsStep from "./steps/Comments";

const AddNewTaskSlideout = ({ onSubmit: onSubmitProp, tasks }) => {
  const { project } = useContext(ProjectContext);
  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  const onSubmit = async (values, form) => {
    try {
      if (Number(router.query["step"]) < 2) {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, step: Number(router.query["step"]) + 1 },
        });
      } else {
        await createCompanyProjectTask({
          projectId: project._id,
          clientId: router.query["clientId"],
          companyId: router.query["companyId"],
          ...values,
        });

        await onSubmitProp();

        onClose(form);
      }
    } catch (caught) {
      console.log(caught);
      const { error = "There was an error adding this task" } = caught;

      notification({
        variant: "error",
        title: "Error adding task",
        message: error,
      });
    }
  };

  const onClose = (form?: any) => {
    const temp = { ...router.query };

    delete temp["add-task"];
    delete temp["step"];

    if (form) {
      form.restart();
    }

    router.push({ pathname: router.pathname, query: temp });
  };

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{ ...arrayMutators }}
      render={({
        form,
        form: {
          mutators: { push, remove },
        },
        handleSubmit,
      }) => {
        return (
          <Slideout
            id="add-task-slideout"
            title="Add new task"
            open={!!router.query["add-task"]}
            onClose={() => onClose()}
            steps={[
              {
                text: "General details",
                content: <GeneralDetailsStep form={form} />,
              },
              {
                text: "To do",
                content: <TodoStep push={push} remove={remove} tasks={tasks} />,
              },
              {
                text: "Files & Comments",
                content: <CommentsStep push={push} />,
              },
            ]}
            actions={[
              {
                id: "submit-task-button",
                text: Number(router.query["step"]) === 2 ? "Add task" : "Next",
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
