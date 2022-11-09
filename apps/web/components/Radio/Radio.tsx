import { RadioProps } from "./types";

import { Field, FormSpy } from "react-final-form";

import { Form } from "@components/Form";

import styles from "./Radio.module.css";

const Radio = ({ id, options, name, onChange, value }: RadioProps) => {
  return (
    <div id={id}>
      <Form
        onSubmit={() => {}}
        render={() => {
          return (
            <>
              {options.map(({ id: optionId, value: optionValue, text }) => (
                <Field
                  type="radio"
                  name={name}
                  initialValue={value}
                  value={optionValue}
                  render={({ input: { checked, onChange } }) => {
                    return (
                      <>
                        <input
                          className={styles.input}
                          type="radio"
                          id={optionId}
                          name={name}
                          value={optionValue}
                          checked={checked}
                          onChange={onChange}
                        />

                        <label
                          className={`${styles.label} ${
                            checked ? styles.checked : ""
                          } `}
                          htmlFor={optionId}
                        >
                          {text}
                        </label>
                      </>
                    );
                  }}
                />
              ))}

              <FormSpy
                subscription={{
                  values: true,
                }}
                onChange={({ values }) => {
                  onChange(values[name]);
                }}
              />
            </>
          );
        }}
      />
    </div>
  );
};

export default Radio;
