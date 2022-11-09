import { useContext, useMemo, useState } from "react";

import { useRouter } from "next/router";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { ProfilePicture } from "@components/ProfilePicture";

import CompanyContext from "@contexts/CompanyContext";
import NotificationContext from "@contexts/NotificationContext";

import diff from "@util/diff";

import { updateCompanyDetails } from "@ordinly/api-abstraction/companies";

import DeleteCompanyModal from "./DeleteCompanyModal";
import MakePublicModal from "./MakePublicModal";
import ChangeOwnerModal from "./ChangeOwnerModal";
import UserContext from "@contexts/UserContext";

import { ButtonProps } from "@components/Button";

const DetailsSlideout = () => {
  const { user } = useContext(UserContext);
  const { company, fetchCompany } = useContext(CompanyContext);
  const { notification } = useContext(NotificationContext);

  const [saving, setSaving] = useState(false);

  const details = useMemo(() => {
    const { name, description, profilePicture, emailAddress, phoneNumber } =
      company || {};

    return {
      name,
      description: description || "",
      profilePicture,
      emailAddress,
      phoneNumber,
    };
  }, [company]);

  const router = useRouter();

  const closeSlideout = () => {
    const temp = router.query;

    delete temp["update-company-details"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  const onSave = async (values) => {
    try {
      setSaving(true);

      if (company) {
        await updateCompanyDetails({
          ...values,
          companyId: company._id,
        });

        await fetchCompany();
      }
    } catch (caught) {
      const { error = "There was an error updating this company" } = caught;

      notification({
        variant: "error",
        title: "Error updating this company",
        message: error,
      });
    }

    closeSlideout();

    setSaving(false);
  };

  const openDeleteCompanyModal = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, "delete-company": true },
    });
  };

  return (
    <Form
      onSubmit={onSave}
      initialValues={details}
      render={({ handleSubmit, form }) => {
        return (
          <Slideout
            id="update-company-details-slideout"
            title="Company details"
            open={router?.query?.hasOwnProperty("update-company-details")}
            onClose={closeSlideout}
            saving={saving}
            dirty={form.getState().dirty}
            actions={[
              ...(company?.owner === user?._id
                ? [
                    {
                      text: "Remove company",
                      onClick: openDeleteCompanyModal,
                      variant: "danger",
                    } as ButtonProps,
                  ]
                : []),
              {
                text: "Save",
                onClick: handleSubmit,
                type: "submit",
              } as ButtonProps,
            ]}
          >
            <div>
              <Field
                name="profilePicture"
                component={ProfilePicture}
                _id={company?._id}
                id="update-company-details-file-upload"
                center
                size="large"
              />

              <Field
                title="Name"
                name="name"
                required={true}
                component={Input}
                id="update-company-details-name-input"
              />
            </div>

            <MakePublicModal />

            <ChangeOwnerModal />

            <DeleteCompanyModal />
          </Slideout>
        );
      }}
    />
  );
};

export default DetailsSlideout;
