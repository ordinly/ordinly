import { useState, useEffect } from "react";

import router from "next/router";

import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { ProfilePicture } from "@components/ProfilePicture";
import { MultiSelect } from "@components/MultiSelect";

import { validateEmail, getTags } from "@ordinly/api-abstraction";

import { isEmail, isPhoneNumber, required } from "@components/Form/validation";

const GeneralDetailsStep = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    (async () => {
      const { tags: newTags } = await getTags();

      setTags(newTags);
    })();
  }, []);

  const isCompanyEmailValid = async (value): Promise<string> => {
    try {
      await validateEmail({
        emailAddress: value,
        companyId: router.query["company-id"] as string,
      });
    } catch (caught) {
      const { error } = caught;

      console.log(error);

      return error;
    }
  };

  return (
    <>
      <Field
        name="profilePicture"
        component={ProfilePicture}
        id="add-company-file-upload"
        center
        size="large"
      />

      <Field
        title="Company name"
        name="name"
        required={true}
        component={Input}
      />

      <Field
        title="Description"
        name="description"
        component={TextArea}
        required={true}
      />

      <Field
        title="Email address"
        name="emailAddress"
        component={Input}
        validate={[required, isEmail, isCompanyEmailValid]}
      />

      <Field
        title="Phone number"
        name="phoneNumber"
        component={Input}
        validate={isPhoneNumber}
      />

      <Field
        title="Tags"
        name="tags"
        component={MultiSelect}
        id="add-company-tags-multiselect"
        options={tags?.map((tag) => ({ label: tag, value: tag }))}
      />
    </>
  );
};

export default GeneralDetailsStep;
