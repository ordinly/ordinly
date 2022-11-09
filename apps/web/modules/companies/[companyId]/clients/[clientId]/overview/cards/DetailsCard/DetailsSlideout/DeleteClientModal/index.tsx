import { useContext } from "react";

import { useRouter } from "next/router";

import { Modal } from "@components/Modal";

import { deleteClient } from "@ordinly/api-abstraction";

import CompanyContext from "@contexts/CompanyContext";
import ClientContext from "@contexts/ClientContext";
import NotificationContext from "@contexts/NotificationContext";

import styles from "./DeleteClientModal.module.css";

const DeleteClientModal = () => {
  const { notification } = useContext(NotificationContext);
  const { fetchCompany } = useContext(CompanyContext);
  const { client } = useContext(ClientContext);

  const router = useRouter();

  const onSubmit = async () => {
    try {
      await deleteClient({
        companyId: router.query["companyId"] as string,
        clientId: router.query["clientId"] as string,
      });

      await fetchCompany();

      router.replace({
        pathname: `/companies/[companyId]/client`,
        query: router.query,
      });
    } catch (caught) {
      console.error(caught);
      const { error = "There was an error deleting this client" } = caught;

      notification({
        variant: "error",
        title: "Error deleting client",
        message: error,
      });
    }
  };

  const onCloseDeleteClientModal = () => {
    const temp = router.query;

    delete temp["delete-client"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  return (
    <Modal
      id="delete-client-modal"
      title="Delete client?"
      onClose={onCloseDeleteClientModal}
      open={!!router?.query["delete-client"]}
      actions={[
        {
          text: "Delete client",
          variant: "danger",
          onClick: onSubmit,
        },
      ]}
    >
      <p className={styles.modalText}>
        Are you sure you want to delete{" "}
        <span className={styles.bold}>{client?.name}</span>?
      </p>
    </Modal>
  );
};

export default DeleteClientModal;
