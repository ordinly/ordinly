import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { FieldArray } from "@components/Field";
import { Button } from "@components/Button";

import { required, isEmail, isPhoneNumber } from "@components/Form/validation";

import { phoneMask, phoneUnmask } from "@util/masks";

import styles from "./Contacts.module.css";

const ContactsStep = ({ push }) => {
  const onAddItem = () => {
    push("contacts", undefined);
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.sectionTitle}>Contacts</p>

        <div className={styles.fieldContainer}>
          <FieldArray name="contacts">
            {({ fields }) => (
              <>
                {fields?.length ? (
                  fields.map((name, index) => (
                    <div className={styles.tileContainer}>
                      <div className={styles.topContainer}>
                        <Field
                          title="Name"
                          hideErrorMessage
                          name={`${name}.name`}
                          component={Input}
                          validate={required}
                          id="new-contact-item-name-input"
                          autocomplete="name"
                        />

                        <Field
                          title="Phone number"
                          name={`${name}.phoneNumber`}
                          component={Input}
                          id="new-contact-item-phone-number-input"
                          mask={phoneMask}
                          unmask={phoneUnmask}
                          validate={isPhoneNumber}
                        />
                      </div>

                      <Field
                        title="Email"
                        hideErrorMessage
                        name={`${name}.email`}
                        component={Input}
                        validate={isEmail}
                        id="new-contact-item-email-input"
                      />

                      {index ? (
                        <div className={styles.button}>
                          <Button
                            id="remove-new-client-item-button"
                            text="Remove contact"
                            icon="trash"
                            onClick={() => fields.remove(index)}
                            variant="ghost"
                          />
                        </div>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <div className={styles.tileContainer}>
                    <div className={styles.topContainer}>
                      <Field
                        title="Name"
                        hideErrorMessage
                        name={`contacts[0].name`}
                        component={Input}
                        validate={required}
                        id="new-contact-item-name-input"
                        autocomplete="name"
                      />

                      <Field
                        title="Phone number"
                        name={`contacts[0].phoneNumber`}
                        component={Input}
                        id="new-contact-item-phone-number-input"
                        mask={phoneMask}
                        unmask={phoneUnmask}
                        validate={isPhoneNumber}
                      />
                    </div>

                    <Field
                      title="Email"
                      hideErrorMessage
                      name={`contacts[0].email`}
                      component={Input}
                      validate={isEmail}
                      id="new-contact-item-email-input"
                    />
                  </div>
                )}
              </>
            )}
          </FieldArray>
        </div>

        <div className={styles.summary}>
          <div>
            <Button
              text="Add another contact"
              onClick={onAddItem}
              variant="outline"
              icon="add"
              size="small"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactsStep;
