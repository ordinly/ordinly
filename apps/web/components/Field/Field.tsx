import { useEffect } from "react";
import { Field } from "react-final-form";

import { required } from "@components/Form/validation";

import styles from "./Field.module.css";

import type { FieldProps } from "./types";

const FieldRender = ({
  inline,
  title,
  Component,
  name,
  onChange,
  onFocus,
  onBlur,
  value,
  touched,
  error,
  initialValue,
  center,
  hideErrorMessage,
  required: isRequired,
  helper,
  ...restProps
}) => {
  useEffect(() => {
    if (initialValue && !value && initialValue !== value) {
      onChange(initialValue);
    }
  }, [initialValue]);

  return (
    <div
      className={`${center ? styles.center : ""} ${styles.container} ${
        inline ? styles.inline : ""
      }`}
    >
      {title ? (
        <label className={styles.title}>
          {title}
          {isRequired ? <span className={styles.required}>*</span> : null}
        </label>
      ) : null}

      <Component
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        value={value}
        error={touched && error}
        labelledBy={`${name}`}
        touched={touched}
        invalid={touched && error}
        initialValue={initialValue}
        {...restProps}
      />

      {!hideErrorMessage && touched && error ? (
        <p className={styles.error}>{value ? error : helper ?? error}</p>
      ) : helper ? (
        <p className={styles.helper}>{helper}</p>
      ) : null}
    </div>
  );
};

const FormField = ({
  name,
  validate,
  component: Component,
  onChange: onChangeCallback,
  title,
  inline,
  initialValue,
  type,
  destroyOnUnregister = true,
  center,
  hideErrorMessage,
  validateFields,
  required: isRequired,
  helper,
  ...restProps
}: FieldProps) => (
  <Field
    name={name}
    type={type}
    validate={(value, allValues) => {
      if (isRequired) {
        const notPresent = required(value);

        return notPresent;
      }

      if (validate) {
        if (Array.isArray(validate)) {
          for (let i = 0; i < validate.length; i++) {
            const error = validate[i](value, allValues);

            if (error) {
              return error;
            }
          }
        } else {
          return validate(value, allValues);
        }
      }
    }}
    initialValue={initialValue}
    destroyOnUnregister={destroyOnUnregister}
    validateFields={validateFields}
    render={({
      input: { name, onBlur, onChange, onFocus, value },
      meta: { touched, error },
    }) => (
      <FieldRender
        {...{
          inline,
          center,
          title,
          Component,
          name,
          onChange: (newValue) => {
            if (onChange) {
              onChange(newValue);
            }

            if (onChangeCallback) {
              onChangeCallback(newValue);
            }
          },
          onFocus,
          onBlur,
          value,
          touched,
          error,
          initialValue,
          hideErrorMessage,
          required: isRequired,
          helper: helper,
          ...restProps,
        }}
      />
    )}
  />
);

export default FormField;
