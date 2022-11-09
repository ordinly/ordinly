import { useContext } from "react";

import { useRouter } from "next/router";

import { login } from "@ordinly/api-abstraction";

import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { isEmail } from "@components/Form/validation";

import NotificationContext from "@contexts/NotificationContext";
import UserContext from "@contexts/UserContext";

import styles from "./Login.module.css";

const Login = () => {
  const { notification } = useContext(NotificationContext);
  const { setUser } = useContext(UserContext);

  const router = useRouter();

  const onNavigateToSignUp = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, form: "sign-up" },
    });
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
    <aside className={styles.loginContainer}>
      <h1 className={styles.title}>Log in</h1>

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
                  title="Password"
                  name="password"
                  required={true}
                  component={Input}
                  htmlType="password"
                />

                <p className={styles.formError}>{submitError}</p>

                <div className={styles.actions}>
                  <Button
                    onClick={onNavigateToSignUp}
                    variant="ghost"
                    text="Go to sign up page"
                  />

                  <Button text="Log in" onClick={handleSubmit} type="submit" />
                </div>
              </>
            );
          }}
        />
      </div>
    </aside>
  );
};

export default Login;
