import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { isEmail, required } from "@components/Form/validation";

const GeneralDetailsStep = ({ disabled }: { disabled?: boolean }) => {
  return (
    <>
      <Field
        title="Name"
        name="name"
        component={Input}
        validate={required}
        id="new-contact-name-input"
        disabled={disabled}
      />

      <Field
        title="Description"
        name="description"
        component={TextArea}
        id="new-contact-description-input"
        disabled={disabled}
      />

      <Field
        title="Email"
        name="email"
        validate={isEmail}
        component={Input}
        id="new-contact-email-input"
        disabled={disabled}
      />

      <Field
        title="Phone number"
        name="phoneNumber"
        component={Input}
        id="new-contact-phone-number-input"
        disabled={disabled}
      />
    </>
  );
};

export default GeneralDetailsStep;
