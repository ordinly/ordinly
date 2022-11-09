import { useContext, useState } from "react";

import { useRouter } from "next/router";

import { signUp } from "@ordinly/api-abstraction";

import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { required, isEmail } from "@components/Form/validation";

import NotificationContext from "@contexts/NotificationContext";

import styles from "./SignUp.module.css";

const SignUp = () => {
  const { notification } = useContext(NotificationContext);

  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();

  const onNavigateToLogin = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, form: "login" },
    });
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
    <aside className={styles.signUpContainer}>
      <h1 className={styles.title}>
        {submitted ? "Verification email sent" : "Sign up"}
      </h1>

      {submitted ? (
        <p className={styles.verificationText}>
          We just sent a verification email to the email address you entered.
        </p>
      ) : (
        <div className={styles.formContainer}>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitError }) => {
              return (
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

                  <p className={styles.formError}>{submitError}</p>

                  <div className={styles.actions}>
                    <Button
                      onClick={onNavigateToLogin}
                      variant="ghost"
                      text="Go to login page"
                    />

                    <Button
                      text="Sign up"
                      onClick={handleSubmit}
                      type="submit"
                    />
                  </div>
                </>
              );
            }}
          />
        </div>
      )}
    </aside>
  );
};

export default SignUp;
