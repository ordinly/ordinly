import { useContext } from "react";

import { useRouter } from "next/router";

import { Button } from "@components/Button";
import { Modal } from "@components/Modal";
import { Radio } from "@components/Radio";
import { Form } from "@components/Form";
import { required } from "@components/Form/validation";
import { Field } from "@components/Field";
import { Select } from "@components/Select";

import { updateCompanyOwner } from "@ordinly/api-abstraction/companies";

import CompanyContext from "@contexts/CompanyContext";
import NotificationContext from "@contexts/NotificationContext";

import styles from "./Modal.module.css";

const ChangeOwnershipModal = () => {
  const { notification } = useContext(NotificationContext);
  const { company, fetchCompany } = useContext(CompanyContext);

  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      await updateCompanyOwner({ ...values, companyId: company?._id });

      onCloseChangeOwnershipModal();

      if (values.onChangeOwner === "change-role") {
        await fetchCompany();
      } else {
        router.replace("/companies");
      }
    } catch (caught) {
      const { error = "There was an error changing this company's owner" } =
        caught;

      notification({
        variant: "error",
        title: "Error changing owner",
        message: error,
      });
    }
  };

  const onCloseChangeOwnershipModal = () => {
    const temp = router.query;

    delete temp["change-owner"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ onChangeOwner: "leave-company" }}
      render={({ form, handleSubmit }) => {
        return (
          <Modal
            id="change-owner-modal"
            title="Change owner?"
            onClose={onCloseChangeOwnershipModal}
            open={!!router?.query["change-owner"]}
            actions={[
              {
                text: "Change ownership",
                variant: "danger",
                onClick: handleSubmit,
              },
            ]}
          >
            <>
              <p className={styles.modalText}>
                Are you sure you want to change the ownership of{" "}
                <span className={styles.bold}>{company?.name}</span>?
              </p>

              <Field
                name="newOwner"
                title="New owner"
                component={Select}
                validate={required}
                id="new-owner-select"
                options={company?.workers.reduce((total, current) => {
                  if (current._id !== company.owner._id) {
                    return [
                      ...total,
                      {
                        value: current._id,
                        label: current.name,
                      },
                    ];
                  }
                  return total;
                }, [])}
              />

              <p className={styles.modalText}>
                To do so, you'll need to either pick a new role for yourself or
                leave the company
              </p>

              <Field
                name="onChangeOwner"
                component={Radio}
                initialValue={"leave-company"}
                id="change-owner-radio"
                options={[
                  {
                    id: "leave-company-option",
                    text: "Leave company",
                    value: "leave-company",
                  },
                  {
                    id: "change-role-option",
                    text: "Change role",
                    value: "change-role",
                  },
                ]}
              />

              {form?.getFieldState("onChangeOwner")?.value ===
                "change-role" && (
                <Field
                  name="newRole"
                  title="New role"
                  component={Select}
                  id="new-role-select"
                  validate={required}
                  options={company?.roles.map(
                    ({ _id, name }) => ({
                      value: _id,
                      label: name,
                    }),
                    []
                  )}
                />
              )}
            </>
          </Modal>
        );
      }}
    />
  );
};

export default ChangeOwnershipModal;
