import { useContext } from "react";

import { useRouter } from "next/router";

import arrayMutators from "final-form-arrays";

import NotificationContext from "@contexts/NotificationContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";

import { createUserProject } from "@ordinly/api-abstraction/users";

import GeneralDetailsStep from "./steps/GeneralDetails";
import CompaniesStep from "./steps/Companies";

const AddNewProjectSlideout = ({ onSubmit: onSubmitProp }) => {
  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  const onClose = (form?: any) => {
    const temp = { ...router.query };

    delete temp["add-new-project"];
    delete temp["tab"];

    if (form) {
      form.restart();
    }

    router.push({ pathname: router.pathname, query: temp });
  };

  const onSubmit = async (values, form) => {
    try {
      await createUserProject(values);

      await onSubmitProp();

      onClose(form);
    } catch (caught) {
      const { error = "There was an error adding this project" } = caught || {};

      notification({
        variant: "error",
        title: "Error adding project",
        message: error,
      });
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit, form }) => {
        return (
          <Slideout
            id="add-project-slideout"
            title="Add new project"
            open={!!router.query["add-new-project"]}
            onClose={() => onClose()}
            dirty={form.getState().dirty}
            actions={[
              {
                id: "add-project-submit-button",
                text: "Add project",
                onClick: handleSubmit,
                type: "submit",
              },
            ]}
          >
            <GeneralDetailsStep />
          </Slideout>
        );
      }}
    />
  );
};

export default AddNewProjectSlideout;
