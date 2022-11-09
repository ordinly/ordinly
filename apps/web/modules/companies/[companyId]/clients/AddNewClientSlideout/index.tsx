import { useContext } from "react";

import { useRouter } from "next/router";

import arrayMutators from "final-form-arrays";

import CompanyContext from "@contexts/CompanyContext";
import NotificationContext from "@contexts/NotificationContext";

import { Form } from "@components/Form";
import { Slideout } from "@components/Slideout";

import { createClient } from "@ordinly/api-abstraction";

import GeneralDetailsStep from "./steps/GeneralDetails";
import ContactsStep from "./steps/Contacts";

const AddNewClientSlideout = ({ onSubmit: onSubmitProp }) => {
  const { company } = useContext(CompanyContext);
  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  const onClose = (form?: any) => {
    const temp = { ...router.query };

    delete temp["add-new-client"];
    delete temp["step"];

    if (form) {
      form.restart();
    }

    router.push({ pathname: router.pathname, query: temp });
  };

  const onSubmit = async (newValues, form) => {
    try {
      if (Number(router.query["step"]) < 1) {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, step: Number(router.query["step"]) + 1 },
        });
      } else {
        await createClient({
          companyId: company._id,
          ...newValues,
        });

        onSubmitProp();

        onClose(form);
      }
    } catch (caught) {
      const { error = "There was an error adding this client" } = caught || {};

      notification({
        variant: "error",
        title: "Error adding client",
        message: error,
      });
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ type: "Company" }}
      mutators={{ ...arrayMutators }}
      render={({ form, handleSubmit }) => {
        return (
          <Slideout
            id="add-client-slideout"
            title="Add new client"
            open={!!router.query["add-new-client"]}
            onClose={() => onClose()}
            steps={[
              {
                text: "General details",
                content: <GeneralDetailsStep form={form} />,
              },
              {
                text: "Contacts",
                content: <ContactsStep push={form.mutators.push} />,
              },
            ]}
            actions={[
              {
                id: "submit-task-button",
                text:
                  Number(router.query["step"]) === 1 ? "Add client" : "Next",
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

export default AddNewClientSlideout;
