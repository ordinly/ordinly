import { useContext } from "react";

import { useRouter } from "next/router";

import arrayMutators from "final-form-arrays";

import NotificationContext from "@contexts/NotificationContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";

import { createCompanyProject } from "@ordinly/api-abstraction";

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
      if (Number(router.query["step"]) < 1) {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, step: Number(router.query["step"]) + 1 },
        });
      } else {
        await createCompanyProject({
          ...values,
          companyId: router.query["companyId"],
          ...(router.query["clientId"]
            ? { clientId: router.query["clientId"] }
            : {}),
        });

        await onSubmitProp();

        onClose(form);
      }
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
            steps={[
              {
                text: "General details",
                content: <GeneralDetailsStep />,
              },
              {
                text: "Invite companies",
                content: <CompaniesStep />,
              },
            ]}
            actions={[
              {
                id: "add-project-submit-button",
                text:
                  Number(router.query["step"]) === 1 ? "Add project" : "Next",
                onClick: handleSubmit,
                type: "submit",
              },
            ]}
          ></Slideout>
        );
      }}
    />
  );
};

export default AddNewProjectSlideout;
