import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Field, FieldArray } from "@components/Field";
import { CloseButton } from "@components/CloseButton";

import styles from "./InputList.module.css";

import type { InputListProps } from "./types";

const InputList = ({
  id,
  name,
  disabled,
  mask,
  unmask,
  fieldValidator,
  addNewButton,
  state,
  allowEmpty = true,
}: InputListProps) => {
  return (
    <div id={id}>
      <FieldArray name={name}>
        {({ fields }) =>
          fields.map((fieldName, index) => (
            <div className={styles.formFieldContainer}>
              <Field
                inline
                name={fieldName}
                component={Input}
                mask={mask}
                unmask={unmask}
                validate={fieldValidator}
                disabled={disabled}
              />

              {allowEmpty || index ? (
                <CloseButton
                  id=""
                  onClick={index ? () => fields.remove(index) : null}
                />
              ) : (
                <>
                  {state?.value?.length > 1 ? (
                    <div style={{ width: "33.33px" }} />
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          ))
        }
      </FieldArray>

      {addNewButton ? (
        <div className={styles.addItemContainer}>
          <div>
            <Button {...addNewButton} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InputList;
