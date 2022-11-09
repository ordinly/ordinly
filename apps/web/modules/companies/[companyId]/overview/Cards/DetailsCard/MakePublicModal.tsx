import { useContext } from "react";

import { useRouter } from "next/router";

import { Button } from "@components/Button";
import { Modal } from "@components/Modal";

import CompanyContext from "@contexts/CompanyContext";
import NotificationContext from "@contexts/NotificationContext";

import { updateCompanyPublicity } from "@ordinly/api-abstraction/companies/updateCompanyPublicity";

import styles from "./Modal.module.css";

const MakePublicModal = () => {
  const { notification } = useContext(NotificationContext);
  const { company, fetchCompany } = useContext(CompanyContext);

  const router = useRouter();

  const onSubmit = async () => {
    try {
      await updateCompanyPublicity({
        companyId: company?._id,
        public: !company?.public,
      });

      await fetchCompany();

      onCloseMakePublicCompanyModal();
    } catch (caught) {
      const {
        error = "There was an error changing this company's public setting",
      } = caught;

      notification({
        variant: "error",
        title: "Error changing public setting",
        message: error,
      });
    }
  };

  const onCloseMakePublicCompanyModal = () => {
    const temp = router.query;

    delete temp["make-company-public"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  return (
    <Modal
      id="make-public-modal"
      title={`Make ${company?.public ? "private" : "public"}?`}
      onClose={onCloseMakePublicCompanyModal}
      open={!!router?.query["make-company-public"]}
      actions={[
        {
          text: `Make ${company?.public ? "private" : "public"}`,
          variant: "danger",
          onClick: onSubmit,
        },
      ]}
    >
      <p className={styles.modalText}>
        Are you sure you want to make{" "}
        <span className={styles.bold}>{company?.name}</span>{" "}
        {company?.public ? "private" : "public"}?
      </p>

      <p className={styles.modalText}>
        This means that others{" "}
        <span className={styles.bold}>will {company?.public ? "not" : ""}</span>{" "}
        be able to find your company when searching for companies
      </p>
    </Modal>
  );
};

export default MakePublicModal;
