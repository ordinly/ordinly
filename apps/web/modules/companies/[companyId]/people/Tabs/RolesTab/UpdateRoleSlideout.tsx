import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import CompanyContext from "@contexts/CompanyContext";
import NotificationContext from "@contexts/NotificationContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Modal } from "@components/Modal";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { PermissionsInput } from "@components/PermissionsInput";

import {
  updateRole,
  removeRole,
  getCompanyRole,
} from "@ordinly/api-abstraction/companies";

import type { ButtonProps } from "@components/Button";

import styles from "./UpdateRoleSlideout.module.css";

const UpdateRoleSlideout = ({ onSubmit: onSubmitProp }) => {
  const { notification } = useContext(NotificationContext);
  const { company } = useContext(CompanyContext);

  const [role, setRole] = useState<any>();
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.query["role-id"]) {
      (async () => {
        const { role: fetchedRole } = await getCompanyRole({
          roleId: router.query["role-id"],
          companyId: router.query["companyId"],
        });

        setRole(fetchedRole);
      })();
    }
  }, [router.query["role-id"]]);

  const onClose = (form) => {
    const temp = { ...router.query };

    delete temp["role-details"];
    delete temp["role-id"];
    delete temp["remove-role-modal"];

    if (form) {
      form.restart();
    }

    onCloseRemoveRoleModal();

    router.push({ pathname: router.pathname, query: temp });
  };

  const onSave = async (values, form) => {
    try {
      await updateRole({
        ...values,
        companyId: company._id,
        roleId: role?._id,
      });

      onSubmitProp();

      onClose(form);
    } catch (caught) {
      const { error = "There was an error updating this role" } = caught;

      notification({
        variant: "error",
        title: "Error updating role",
        message: error,
      });
    }
  };

  const onOpenRemoveRoleModal = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "remove-role-modal": true,
      },
    });
  };

  const onCloseRemoveRoleModal = () => {
    const temp = { ...router.query };

    delete temp["remove-role-modal"];

    router.push({ pathname: router.pathname, query: temp });
  };

  const onRemoveRole = async (form) => {
    try {
      await removeRole({ companyId: company._id, roleId: role._id });

      onSubmitProp();

      onClose(form);
    } catch (caught) {
      const { error = "There was an error removing this role" } = caught;

      notification({
        variant: "error",
        title: "Error removing role",
        message: error,
      });
    }
  };

  console.log(role);

  return (
    <Form
      onSubmit={onSave}
      render={({ handleSubmit, form }) => {
        return (
          <>
            <Slideout
              id="role-details-slideout"
              title="Update role"
              open={!!router.query["role-details"]}
              onClose={() => onClose(form)}
              saving={saving}
              dirty={form.getState().dirty}
              actions={[
                ...(role?.canRemove
                  ? [
                      {
                        id: "remove-role-button",
                        onClick: onOpenRemoveRoleModal,
                        text: "Remove role",
                        variant: "danger",
                      } as ButtonProps,
                    ]
                  : []),
                ...(role?.canEdit
                  ? [
                      {
                        text: "Save",
                        onClick: handleSubmit,
                        type: "submit",
                      } as ButtonProps,
                    ]
                  : []),
              ]}
            >
              <div id="role-details-slideout-form">
                <Field
                  title="Name"
                  name="name"
                  required
                  component={Input}
                  initialValue={role?.name}
                  id="role-details-name-input"
                  readOnly={!role?.canEdit}
                />

                <Field
                  title="Description"
                  name="description"
                  required
                  initialValue={role?.description}
                  component={TextArea}
                  id="role-details-description-textarea"
                  readOnly={!role?.canEdit}
                />

                {role ? (
                  <Field
                    title="Permissions"
                    name="permissions"
                    initialValue={role?.permissions}
                    component={PermissionsInput}
                    id="role-details-permissions"
                    readOnly={!role?.canEdit}
                  />
                ) : null}
              </div>

              <Modal
                id="remove-role-modal"
                title="Remove role?"
                onClose={onCloseRemoveRoleModal}
                open={!!router?.query["remove-role-modal"]}
                actions={[
                  {
                    text: "Remove role",
                    onClick: () => onRemoveRole(form),
                    variant: "danger",
                  },
                ]}
              >
                <p className={styles.modalText}>
                  Are you sure you want to remove the{" "}
                  <span className={styles.bold}>{role?.name}</span> role?
                </p>
              </Modal>
            </Slideout>
          </>
        );
      }}
    />
  );
};

export default UpdateRoleSlideout;
