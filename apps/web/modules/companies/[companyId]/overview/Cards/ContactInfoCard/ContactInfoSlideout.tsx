import { useContext, useState } from "react";

import { useRouter } from "next/router";

import arrayMutators from "final-form-arrays";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { InputList } from "@components/List";

import CompanyContext from "@contexts/CompanyContext";
import NotificationContext from "@contexts/NotificationContext";

import { updateCompanyContactInfo } from "@ordinly/api-abstraction/companies";
import { isEmail, isPhoneNumber } from "@components/Form/validation";
import { phoneMask, phoneUnmask } from "@util/masks";

const ContactInfoSlideout = () => {
  const { company, fetchCompany } = useContext(CompanyContext);
  const { notification } = useContext(NotificationContext);

  const [saving, setSaving] = useState(false);

  const router = useRouter();

  const closeSlideout = () => {
    const temp = router.query;

    delete temp["update-contact-info"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  const onSave = async (values) => {
    try {
      setSaving(true);

      const response = await updateCompanyContactInfo({
        ...values,
        companyId: company._id,
      });

      if ("error" in response) {
        throw response;
      } else {
        await fetchCompany();

        closeSlideout();
      }
    } catch (caught) {
      const { error = "Error updating contact info" } = caught;

      notification({
        variant: "error",
        title: "Unable to fetch companies",
        message: error,
      });
    }
  };

  return (
    <Form
      onSubmit={onSave}
      mutators={{ ...arrayMutators }}
      initialValues={{
        emailAddresses: company?.emailAddresses?.length
          ? company?.emailAddresses
          : [""],
        phoneNumbers: company?.phoneNumbers?.length
          ? company?.phoneNumbers
          : [""],
      }}
      render={({
        form: {
          getState,
          getFieldState,
          mutators: { push },
        },
        handleSubmit,
      }) => {
        return (
          <Slideout
            id="update-contact-info"
            title="Update contact info"
            open={router?.query?.hasOwnProperty("update-contact-info")}
            onClose={closeSlideout}
            saving={saving}
            dirty={getState().dirty}
            actions={[
              {
                text: "Save",
                onClick: handleSubmit,
                type: "submit",
              },
            ]}
          >
            <>
              <div>
                <Field
                  title="Email addresses"
                  name="emailAddresses"
                  component={InputList}
                  state={getFieldState("emailAddresses")}
                  fieldValidator={isEmail}
                  addNewButton={{
                    text: "Add another email address",
                    onClick: () => {
                      push("emailAddresses", "");
                    },
                    disabled: getFieldState("emailAddresses")?.error,
                    variant: "outline",
                    icon: "add",
                    size: "small",
                  }}
                />

                <Field
                  title="Phone numbers"
                  name="phoneNumbers"
                  component={InputList}
                  state={getFieldState("phoneNumbers")}
                  fieldValidator={isPhoneNumber}
                  mask={phoneMask}
                  unmask={phoneUnmask}
                  addNewButton={{
                    text: "Add another phone number",
                    onClick: () => {
                      push("phoneNumbers", "");
                    },
                    disabled: !getFieldState("phoneNumbers")?.error,
                    variant: "outline",
                    icon: "add",
                    size: "small",
                  }}
                />
              </div>
            </>
          </Slideout>
        );
      }}
    />
  );
};

export default ContactInfoSlideout;
