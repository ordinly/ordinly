import { useMemo } from "react";

import { useRouter } from "next/router";

import { Modal } from "@components/Modal";
import { Button } from "@components/Button";

import styles from "./SubscriptionSuccessModal.module.css";

const SuccessErrorModal = () => {
  const router = useRouter();

  const onClose = () => {
    const temp = router.query;

    delete temp["subscription-success"];
    delete temp["session_id"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  const onOpenAddWorkerModal = () => {
    const temp = router.query;

    delete temp["subscription-success"];
    delete temp["session_id"];

    temp["invitations"] = "true";

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  return (
    <Modal
      id="subscription-success-modal"
      title="Success!"
      onClose={onClose}
      open={!!router?.query["subscription-success"]}
      actions={[
        {
          text: "Invite a worker",
          onClick: onOpenAddWorkerModal,
        },
      ]}
    >
      <p className={styles.modalText}>
        You have successfully added a subscription, you can now add workers to
        this company
      </p>
    </Modal>
  );
};

export default SuccessErrorModal;
