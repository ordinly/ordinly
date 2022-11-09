import { useContext, useState } from "react";

import { useRouter } from "next/router";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ProfilePicture } from "@components/ProfilePicture";

import { required } from "@components/Form/validation";

import UserContext from "@contexts/UserContext";
import NotificationContext from "@contexts/NotificationContext";

import { updateAccount } from "@ordinly/api-abstraction";

import ChangePasswordModal from "./ChangePasswordModal";

import styles from "./DetailsSlideout.module.css";

const DetailsSlideout = () => {
  const { user, fetchUser } = useContext(UserContext);
  const { notification } = useContext(NotificationContext);

  const [saving, setSaving] = useState(false);

  const router = useRouter();

  const closeSlideout = () => {
    const temp = router.query;

    delete temp["update-account-details"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  const openChangePasswordModal = async () => {
    await router.replace({
      pathname: router.pathname,
      query: { ...router.query, "change-password": true },
    });
  };

  const onSave = async (values) => {
    try {
      setSaving(true);

      await updateAccount(values);

      await fetchUser();

      setSaving(false);

      closeSlideout();
    } catch (caught) {
      const { error = "There was an error updating your account" } = caught;

      notification({
        variant: "error",
        title: "Error updating account ",
        message: error,
      });
    }

    setSaving(false);
  };

  return (
    <Form
      onSubmit={onSave}
      initialValues={user}
      render={({ form, handleSubmit }) => {
        return (
          <Slideout
            id="update-account-details-slideout"
            title="Account details"
            open={router?.query?.hasOwnProperty("update-account-details")}
            onClose={closeSlideout}
            saving={saving}
            actions={[
              { text: "Save account", onClick: handleSubmit, type: "submit" },
            ]}
            dirty={form.getState().dirty}
          >
            <div className={styles.container}>
              <div className={styles.form}>
                <Field
                  name="profilePicture"
                  component={ProfilePicture}
                  id="update-account-file-upload"
                  center
                  _id={user?._id}
                  variant="user"
                  size="large"
                />

                <Field
                  title="Full name"
                  name="name"
                  validate={required}
                  component={Input}
                />
              </div>

              <h3 className={styles.dangerZoneSubtitle}>Danger zone</h3>

              <div className={styles.dangerZoneWrapper}>
                <Button
                  text="Change password"
                  variant="outline"
                  danger
                  onClick={openChangePasswordModal}
                />
              </div>
            </div>

            <ChangePasswordModal />
          </Slideout>
        );
      }}
    />
  );
};

export default DetailsSlideout;
