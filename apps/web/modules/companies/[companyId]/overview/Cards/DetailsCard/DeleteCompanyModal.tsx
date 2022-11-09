import { useContext } from "react";

import { useRouter } from "next/router";

import { Modal } from "@components/Modal";

import { deleteCompany } from "@ordinly/api-abstraction/companies";

import CompanyContext from "@contexts/CompanyContext";
import CompaniesContext from "@contexts/CompaniesContext";
import NotificationContext from "@contexts/NotificationContext";

import styles from "./Modal.module.css";

const DeleteCompanyModal = () => {
  const { notification } = useContext(NotificationContext);
  const { company } = useContext(CompanyContext);
  const { refreshCompanies } = useContext(CompaniesContext);

  const router = useRouter();

  const onSubmit = async () => {
    try {
      await deleteCompany({ companyId: company?._id });

      refreshCompanies();

      router.replace("/my-work/personal/dashboard");
    } catch (caught) {
      console.error(caught);
      const { error = "There was an error deleting this company" } = caught;

      notification({
        variant: "error",
        title: "Error deleting company",
        message: error,
      });
    }
  };

  const onCloseDeleteCompanyModal = () => {
    const temp = router.query;

    delete temp["delete-company"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  return (
    <Modal
      id="delete-company-modal"
      title="Remove company?"
      onClose={onCloseDeleteCompanyModal}
      open={!!router?.query["delete-company"]}
      actions={[
        {
          text: "Remove company",
          variant: "danger",
          onClick: onSubmit,
        },
      ]}
    >
      <p className={styles.modalText}>
        Are you sure you want to remove{" "}
        <span className={styles.bold}>{company?.name}</span>?
      </p>

      <p className={styles.modalText}>
        You can re-instate this company later by contacting Ordinly support
      </p>
    </Modal>
  );
};

export default DeleteCompanyModal;
