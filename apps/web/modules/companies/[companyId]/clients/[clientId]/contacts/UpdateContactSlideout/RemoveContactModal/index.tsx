import { useContext } from "react";

import { useRouter } from "next/router";

import { Modal } from "@components/Modal";

import { removeContact } from "@ordinly/api-abstraction/companies";

import ClientContext from "@contexts/ClientContext";
import NotificationContext from "@contexts/NotificationContext";

import styles from "./RemoveContactModal.module.css";

const RemoveContactModal = ({ contact }) => {
  const { fetchClient } = useContext(ClientContext);

  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  const onSubmit = async () => {
    try {
      await removeContact({
        companyId: router.query["companyId"] as string,
        clientId: router.query["clientId"] as string,
        contactId: router.query["contact-id"] as string,
      });

      await fetchClient();

      router.replace(router.asPath.split("?")[0]);
    } catch (caught) {
      console.error(caught);
      const { error = "There was an error removing this contact" } = caught;

      notification({
        variant: "error",
        title: "Error removing contact",
        message: error,
      });
    }
  };

  const onCloseRemoveContactModal = () => {
    const temp = router.query;

    delete temp["remove-contact"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  return (
    <Modal
      id="remove-contact-modal"
      title="Remove contact?"
      onClose={onCloseRemoveContactModal}
      open={!!router?.query["remove-contact"]}
      actions={[
        {
          text: "Remove contact",
          variant: "danger",
          onClick: onSubmit,
        },
      ]}
    >
      <p className={styles.modalText}>
        Are you sure you want to remove{" "}
        <span className={styles.bold}>{contact?.name}</span>?
      </p>
    </Modal>
  );
};

export default RemoveContactModal;
