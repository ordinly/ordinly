import { useContext, useState, useCallback, useMemo } from "react";

import { useRouter } from "next/router";

import arrayMutators from "final-form-arrays";

import CompanyContext from "@contexts/CompanyContext";
import ClientContext from "@contexts/ClientContext";
import NotificationContext from "@contexts/NotificationContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";

import { required } from "@components/Form/validation";

import { updateContact } from "@ordinly/api-abstraction/companies";

import GeneralDetailsTab from "./tabs/GeneralDetails";
import NotesTab from "./tabs/Notes";
import FilesTab from "./tabs/Files";

import RemoveContactModal from "./RemoveContactModal";

import type { ButtonVariants } from "@components/Button";

const UpdateContactSlideout = ({ onSubmit: onSubmitProp }) => {
  const [saving, setSaving] = useState(false);

  const { permissions } = useContext(CompanyContext);
  const { client, fetchClient } = useContext(ClientContext);
  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  const contact = useMemo(
    () =>
      client?.contacts?.find(({ _id }) => _id === router.query["contact-id"]),
    [router.query["contact-id"]]
  );

  const onSave = useCallback(
    async (values) => {
      setSaving(true);
      try {
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

        await updateContact({
          companyId: router.query["companyId"],
          clientId: router.query["clientId"],
          contactId: router.query["contact-id"],
          newFiles,
          existingFiles,
          ...rest,
        });

        await fetchClient();
      } catch (caught) {
        console.error(caught);
        const { error = "There was an error updating this contact" } = caught;

        notification({
          variant: "error",
          title: "Error updating contact",
          message: error,
        });
      }

      setSaving(false);
    },
    [router.query]
  );

  const onClose = () => {
    const temp = { ...router.query };

    delete temp["update-contact"];
    delete temp["contact-id"];
    delete temp["remove-contact"];
    delete temp["tab"];

    router.push({ pathname: router.pathname, query: temp });
  };

  const onOpenRemoveContactModal = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "remove-contact": true,
      },
    });
  };

  return (
    <Form
      onSubmit={onSave}
      mutators={{ ...arrayMutators }}
      initialValues={contact}
      render={({ form, handleSubmit }) => {
        return (
          <>
            <Slideout
              id="update-contact-slideout"
              title="Update contact"
              open={!!router.query["update-contact"]}
              onClose={onClose}
              saving={saving}
              dirty={form.getState().dirty}
              tabs={[
                {
                  id: "details-tab",
                  text: "General details",
                  content: <GeneralDetailsTab />,
                  error: form.getState().errors.name,
                },
                {
                  id: "notes-tab",
                  text: "Notes",
                  content: <NotesTab push={form.mutators.push} />,
                },
                {
                  id: "files-tab",
                  text: "Files",
                  content: <FilesTab />,
                },
              ]}
              actions={[
                ...(permissions?.clients?.contacts?.remove
                  ? [
                      {
                        id: "remove-contact-button",
                        text: "Remove contact",
                        onClick: onOpenRemoveContactModal,
                        variant: "danger" as ButtonVariants,
                      },
                    ]
                  : []),
                {
                  id: "update-contact-submit-button",
                  text: "Update contact",
                  onClick: handleSubmit,
                  type: "submit",
                },
              ]}
            />

            <RemoveContactModal contact={contact} />
          </>
        );
      }}
    />
  );
};

export default UpdateContactSlideout;
