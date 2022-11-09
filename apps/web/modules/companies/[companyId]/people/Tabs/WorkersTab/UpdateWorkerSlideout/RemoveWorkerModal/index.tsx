import { useContext } from "react";

import { useRouter } from "next/router";

import CompanyContext from "@contexts/CompanyContext";
import NotificationContext from "@contexts/NotificationContext";

import { Modal } from "@components/Modal";

import { removeWorker } from "@ordinly/api-abstraction/companies";

import styles from "./RemoveWorkerModal.module.css";

const RemoveWorkerModal = ({ onSubmit, worker }) => {
  const { notification } = useContext(NotificationContext);
  const { company } = useContext(CompanyContext);

  const router = useRouter();

  const onClose = () => {
    const temp = { ...router.query };

    delete temp["remove-worker-modal"];

    router.push({ pathname: router.pathname, query: temp });
  };

  const onRemoveWorker = async () => {
    try {
      await removeWorker({ companyId: company?._id, workerId: worker?._id });

      await onSubmit();
    } catch (caught) {
      console.log(caught);
      const {
        error = "There was an error removing this worker from this company",
      } = caught || {};

      notification({
        variant: "error",
        title: "Error removing this worker",
        message: error,
      });
    }
  };

  return (
    <Modal
      id="remove-worker-modal"
      title="Remove worker?"
      onClose={onClose}
      open={!!router?.query["remove-worker-modal"]}
      actions={[
        {
          text: "Remove worker",
          onClick: onRemoveWorker,
          variant: "danger",
        },
      ]}
    >
      <p className={styles.modalText}>
        Are you sure you want to remove{" "}
        <span className={styles.bold}>{worker?.name}</span> from{" "}
        <span className={styles.bold}>{company?.name}</span>?
      </p>

      <p className={styles.modalText}>
        If you think you might be adding them back in the future, you may want
        to change their status to "Inactive" instead.
      </p>
    </Modal>
  );
};

export default RemoveWorkerModal;
