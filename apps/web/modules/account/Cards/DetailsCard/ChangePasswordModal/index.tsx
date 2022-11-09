import { useContext } from "react";

import { useRouter } from "next/router";

import { Modal } from "@components/Modal";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Input } from "@components/Input";

import NotificationContext from "@contexts/NotificationContext";
import UserContext from "@contexts/UserContext";

import { required } from "@components/Form/validation";

import { changePassword } from "@ordinly/api-abstraction/users";

const ChangePasswordModal = () => {
  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  const closeModal = () => {
    const temp = router.query;

    delete temp["change-password"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  const onSubmit = async ({ password }) => {
    try {
      await changePassword({
        password,
      });

      notification({
        variant: "success",
        title: "Password changed",
        message: "You have successfully changed your password",
      });

      closeModal();
    } catch (caught) {
      console.error(caught);
      const { error = "There was an error changing your password" } = caught;

      notification({
        variant: "error",
        title: "Error changing password",
        message: error,
      });
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        const isEqual = (value, allValues) => {
          const { password } = allValues;
          const notPresent = required(value);

          if (notPresent) {
            return notPresent;
          }

          return value !== password
            ? "Must be the same as your new password"
            : undefined;
        };

        return (
          <Modal
            id="change-password-modal"
            title="Change password?"
            onClose={closeModal}
            open={!!router?.query["change-password"]}
            actions={[
              {
                text: "Change password",
                variant: "danger",
                onClick: handleSubmit,
              },
            ]}
          >
            <Field
              title="New password"
              name="password"
              validate={required}
              component={Input}
              htmlType="password"
            />

            <Field
              title="Verify new password"
              name="verifyPassword"
              validate={isEqual}
              component={Input}
              htmlType="password"
            />
          </Modal>
        );
      }}
    />
  );
};

export default ChangePasswordModal;
