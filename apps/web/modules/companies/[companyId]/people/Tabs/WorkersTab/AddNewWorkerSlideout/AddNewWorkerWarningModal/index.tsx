import { useContext } from "react";

import { useRouter } from "next/router";

import sleep from "@util/sleep";

import { Modal } from "@components/Modal";

import { inviteWorkers } from "@ordinly/api-abstraction/companies";

import CompanyContext from "@contexts/CompanyContext";
import NotificationContext from "@contexts/NotificationContext";

import styles from "./AddNewWorkerWarningModal.module.css";

const AddNewWorkerWarningModal = ({ invitations, onSubmit: onSubmitProp }) => {
  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  const onSubmit = async () => {
    try {
      const response = await inviteWorkers({
        _id: router.query.companyId as string,
        invitations,
      });

      if ("error" in response) {
        throw response;
      } else {
        const temp = router.query;

        delete temp["add-worker-warning"];

        router.replace({ pathname: router.pathname, query: { ...temp } });

        notification({
          variant: "success",
          title: "Invitation sent",
          message: "Successfully sent invitations",
        });

        await sleep(500);
        onSubmitProp();
      }
    } catch (caught) {
      const { error = "There was an error inviting these workers" } = caught;

      notification({
        variant: "error",
        title: "Error inviting worker",
        message: error,
      });
    }
  };

  const onCancel = () => {
    const temp = router.query;

    delete temp["add-worker-warning"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  return (
    <Modal
      id="add-worker-warning-modal"
      title="Invite workers?"
      onClose={onCancel}
      open={!!router?.query["add-worker-warning"]}
      actions={[
        {
          text: "Invite workers",
          onClick: onSubmit,
        },
      ]}
    >
      <p className={styles.modalText}>
        When these workers accept your invitation to your company they will be
        added as active workers for this billing cycle.
      </p>
    </Modal>
  );
};

export default AddNewWorkerWarningModal;
