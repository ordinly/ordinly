import { useContext } from "react";

import { useRouter } from "next/router";

import arrayMutators from "final-form-arrays";

import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Slideout } from "@components/Slideout";
import { Input } from "@components/Input";
import { ProfilePicture } from "@components/ProfilePicture";
import { Icon } from "@components/Icon";

import { createCompany } from "@ordinly/api-abstraction";

import NotificationContext from "@contexts/NotificationContext";

import styles from "./steps/PaymentInformation.module.css";

const AddNewCompanySlideout = ({ fetchData }) => {
  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  const onSubmit = async (values, form) => {
    try {
      const response = await createCompany({
        ...values,
      });

      if ("error" in response) {
      } else {
        const { companyId } = response;

        closeSlideout(form);

        await fetchData();

        router.push({
          pathname: "/my-work/companies/[companyId]/overview",
          query: { companyId },
        });
      }
    } catch (caught) {
      console.log(caught);
      const { error = "There was an error creating this company" } = caught;

      notification({
        variant: "error",
        title: "Error creating this company",
        message: error,
      });
    }
  };

  const closeSlideout = (form?: any) => {
    const temp = router.query;
    delete temp["add-new-company"];

    if (form) {
      form.restart();
    }
    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit }) => {
        return (
          <Slideout
            id="add-new-company-slideout"
            title="Add new company"
            open={router?.query?.hasOwnProperty("add-new-company")}
            onClose={() => closeSlideout()}
            actions={[
              {
                id: "submit-create-company-button",
                text: "Create company",
                onClick: handleSubmit,
                type: "submit" as "submit",
              },
            ]}
          >
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

            <>
              <div className={styles.pricingContainer}>
                <h3 className={styles.price}>
                  $9.99<span className={styles.perWorker}> / worker*</span>
                </h3>
              </div>

              <div className={styles.feature}>
                <span className={styles.check}>
                  <Icon icon="check" />
                </span>{" "}
                Unlimited projects
              </div>

              <div className={styles.feature}>
                <span className={styles.check}>
                  <Icon icon="check" />
                </span>{" "}
                Unlimited Quotes / invoices
              </div>

              <div className={styles.feature}>
                <span className={styles.check}>
                  <Icon icon="check" />
                </span>{" "}
                Cloud file storage
              </div>

              <p className={styles.description}>
                *30 day free trial, then $9.99 per worker in your company,
                billed monthly. Cancel anytime.
              </p>
            </>
          </Slideout>
        );
      }}
    />
  );
};

export default AddNewCompanySlideout;
