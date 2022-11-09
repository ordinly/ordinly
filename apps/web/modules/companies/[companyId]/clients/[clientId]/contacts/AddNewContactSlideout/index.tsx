import { useContext } from "react";

import { useRouter } from "next/router";

import arrayMutators from "final-form-arrays";

import NotificationContext from "@contexts/NotificationContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";

import { addContact } from "@ordinly/api-abstraction/companies";

import GeneralDetailsStep from "./steps/GeneralDetails";
import NotesStep from "./steps/Notes";
import FilesStep from "./steps/Files";

const AddNewContactSlideout = ({ onSubmit: onSubmitProp }) => {
  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  const onClose = () => {
    const temp = { ...router.query };

    delete temp["add-new-contact"];
    delete temp["step"];

    router.push({ pathname: router.pathname, query: temp });
  };

  const onSubmit = async (values) => {
    try {
      if (Number(router.query["step"]) < 2) {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, step: Number(router.query["step"]) + 1 },
        });
      } else {
        await addContact({
          companyId: router.query["companyId"],
          clientId: router.query["clientId"],
          ...values,
        });

        onSubmitProp();

        onClose();
      }
    } catch (caught) {
      const { error = "There was an error adding this contact" } = caught || {};

      notification({
        variant: "error",
        title: "Error adding contact",
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
            id="add-contact-slideout"
            title="Add new contact"
            open={!!router.query["add-new-contact"]}
            onClose={onClose}
            dirty={form.getState().dirty}
            steps={[
              {
                text: "General details",
                content: <GeneralDetailsStep />,
              },
              {
                text: "Notes",
                content: <NotesStep push={form.mutators.push} />,
              },
              {
                text: "Files",
                content: <FilesStep />,
              },
            ]}
            actions={[
              {
                id: "add-contact-submit-button",
                text:
                  Number(router.query["step"]) === 2 ? "Add contact" : "Next",
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

export default AddNewContactSlideout;
