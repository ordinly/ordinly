import { useContext } from "react";

import { useRouter } from "next/router";

import { login } from "@ordinly/api-abstraction/users";

import { Modal } from "@components/Modal";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Input } from "@components/Input";

import { isEmail } from "@components/Form/validation";

import NotificationContext from "@contexts/NotificationContext";
import UserContext from "@contexts/UserContext";

const LoginModal = () => {
  const router = useRouter();

  const { notification } = useContext(NotificationContext);
  const { setUser } = useContext(UserContext);

  const onCancel = () => {
    const temp = router.query;

    delete temp["login"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  const onSubmit = async (values) => {
    try {
      const { user: newUser } = await login(values);

      if (newUser) {
        await setUser(newUser);

        router.push("/my-work/personal/dashboard");
      }
    } catch (caught) {
      const { error } = caught;
      notification({
        variant: "error",
        title: "Error logging in",
        message: error,
      });
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ form, handleSubmit }) => {
        return (
          <Modal
            id="login-modal"
            title="Log In"
            onClose={onCancel}
            open={!!router?.query["login"]}
            actions={[
              {
                text: "Log In",
                onClick: handleSubmit,
              },
            ]}
          >
            <>
              <Field
                title="Email"
                name="email"
                required={true}
                validate={isEmail}
                component={Input}
              />

              <Field
                title="Password"
                name="password"
                required={true}
                component={Input}
                htmlType="password"
              />
            </>
          </Modal>
        );
      }}
    />
  );
};

export default LoginModal;
