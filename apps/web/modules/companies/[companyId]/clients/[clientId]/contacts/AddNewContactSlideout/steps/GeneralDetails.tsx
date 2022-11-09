import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { isEmail } from "@components/Form/validation";

const GeneralDetailsStep = () => {
  return (
    <>
      <Field
        title="Name"
        name="name"
        required
        component={Input}
        id="new-contact-name-input"
      />

      <Field
        title="Description"
        name="description"
        component={TextArea}
        id="new-contact-description-input"
      />

      <Field
        title="Email"
        name="email"
        validate={isEmail}
        component={Input}
        id="new-contact-email-input"
      />

      <Field
        title="Phone number"
        name="phoneNumber"
        component={Input}
        id="new-contact-phone-number-input"
      />
    </>
  );
};

export default GeneralDetailsStep;
