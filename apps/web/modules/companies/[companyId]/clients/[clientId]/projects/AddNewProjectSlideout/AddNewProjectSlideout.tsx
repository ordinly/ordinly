import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import arrayMutators from "final-form-arrays";

import CompanyContext from "@contexts/CompanyContext";
import ClientContext from "@contexts/ClientContext";
import NotificationContext from "@contexts/NotificationContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";

import { createProject } from "@ordinly/api-abstraction/companies";

import GeneralDetailsStep from "./steps/GeneralDetails";
import AssigneesStep from "./steps/Assignees";

const AddNewProjectSlideout = () => {
  const { company } = useContext(CompanyContext);
  const { fetchClient } = useContext(ClientContext);
  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  const onClose = () => {
    const temp = { ...router.query };

    delete temp["add-new-project"];
    delete temp["tab"];

    router.push({ pathname: router.pathname, query: temp });
  };

  const onSubmit = async (values) => {
    try {
      if (Number(router.query["step"]) < 1) {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, step: Number(router.query["step"]) + 1 },
        });
      } else {
        await createProject({
          companyId: company._id,
          clientId: router.query["clientId"],
          ...values,
        });

        await fetchClient();

        onClose();
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
            onClose={onClose}
            dirty={form.getState().dirty}
            steps={[
              {
                text: "General details",
                content: <GeneralDetailsStep />,
              },
              {
                text: "Assignees",
                content: (
                  <AssigneesStep company={company} push={form.mutators.push} />
                ),
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
          />
        );
      }}
    />
  );
};

export default AddNewProjectSlideout;
