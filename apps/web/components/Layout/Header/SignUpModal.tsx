import { useContext, useState } from "react";

import { useRouter } from "next/router";

import { signUp } from "@ordinly/api-abstraction/users";

import { Modal } from "@components/Modal";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Input } from "@components/Input";

import { isEmail } from "@components/Form/validation";

import NotificationContext from "@contexts/NotificationContext";
import UserContext from "@contexts/UserContext";

const SignUpModal = () => {
  const router = useRouter();

  const { notification } = useContext(NotificationContext);
  const { setUser } = useContext(UserContext);

  const [submitted, setSubmitted] = useState(false);

  const onCancel = () => {
    const temp = router.query;

    delete temp["sign-up"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  const onSubmit = async (values) => {
    try {
      await signUp(values);

      setSubmitted(true);
    } catch ({ error, message }) {
      notification({
        variant: "error",
        title: "Error signing up",
        message: error,
      });
    }
  };

  return (
    <>
      {submitted ? (
        <Modal
          id="sign-up-modal"
          title="Sign Up"
          onClose={onCancel}
          open={!!router?.query["sign-up"]}
          closeText="Close"
        >
          <p>
            We just sent a verification email to the email address you entered.
          </p>
        </Modal>
      ) : (
        <Form
          onSubmit={onSubmit}
          render={({ form, handleSubmit }) => {
            return (
              <Modal
                id="sign-up-modal"
                title="Sign Up"
                onClose={onCancel}
                open={!!router?.query["sign-up"]}
                actions={[
                  {
                    text: "Sign Up",
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
                    title="Full name"
                    name="name"
                    required={true}
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
      )}
    </>
  );
};

export default SignUpModal;
