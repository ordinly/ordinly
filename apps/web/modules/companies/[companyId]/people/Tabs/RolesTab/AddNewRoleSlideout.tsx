import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import CompanyContext from "@contexts/CompanyContext";
import NotificationContext from "@contexts/NotificationContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { PermissionsInput } from "@components/PermissionsInput";

import {
  createRole,
  getCompanyRoleMinimumPermissions,
} from "@ordinly/api-abstraction";

import styles from "./AddNewRoleSlideout.module.css";

const AddNewWorkersSlideout = ({ onSubmit: onSubmitProps }) => {
  const { company } = useContext(CompanyContext);
  const { notification } = useContext(NotificationContext);
  const [minimumPermissions, setMinimumPermissions] = useState({});

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { permissions } = await getCompanyRoleMinimumPermissions();

      setMinimumPermissions(permissions);
    })();
  }, []);

  const onClose = () => {
    const temp = { ...router.query };

    delete temp["add-new-role"];

    router.push({ pathname: router.pathname, query: temp });
  };

  const onSubmit = async (values) => {
    try {
      await createRole({ ...values, companyId: company._id });
      onSubmitProps();
      onClose();
    } catch (caught) {
      const { error = "There was an error adding this role" } = caught;

      notification({
        variant: "error",
        title: "Error adding role",
        message: error,
      });
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => {
        return (
          <Slideout
            id="add-new-role-slideout"
            title="Add new role"
            open={!!router.query["add-new-role"]}
            onClose={onClose}
            dirty={form.getState().dirty}
            actions={[
              {
                id: "add-role-submit-button",
                text: "Add Role",
                onClick: async () => {
                  await handleSubmit();
                },
                icon: "add",
                type: "submit",
              },
            ]}
          >
            <div className={styles.new}>
              <div id="add-new-role-slideout-form">
                <Field
                  title="Name"
                  name="name"
                  required
                  component={Input}
                  id="new-role-name-input"
                />

                <Field
                  title="Description"
                  name="description"
                  required
                  component={TextArea}
                  id="new-role-description-textarea"
                />

                <Field
                  title="Permissions"
                  name="permissions"
                  component={PermissionsInput}
                  id="new-role-permissions"
                  initialValue={minimumPermissions}
                />
              </div>
            </div>
          </Slideout>
        );
      }}
    />
  );
};

export default AddNewWorkersSlideout;
