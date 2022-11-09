import { useRouter } from "next/router";

import { Modal } from "@components/Modal";

import styles from "./OwnerCannotLeaveCompanyWarningModal.module.css";

const OwnerCannotLeaveCompanyWarningModal = () => {
  const router = useRouter();

  const onClose = () => {
    const temp = { ...router.query };

    delete temp["owner-leaving-company"];

    router.push({ pathname: router.pathname, query: temp });
  };

  return (
    <Modal
      id="owner-leaving-company"
      title="Owner leaving company"
      onClose={onClose}
      open={!!router?.query["owner-leaving-company"]}
    >
      <p className={styles.modalText}>
        The owner of a company cannot leave that company.
      </p>

      <p className={styles.modalText}>
        To remove yourself from this company, please transfer ownership to
        another user first.
      </p>
    </Modal>
  );
};

export default OwnerCannotLeaveCompanyWarningModal;
