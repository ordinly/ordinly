import { useContext } from "react";

import { useRouter } from "next/router";

import { Button } from "@components/Button";
import { Modal } from "@components/Modal";

import { deleteInvoice } from "@ordinly/api-abstraction";

import NotificationContext from "@contexts/NotificationContext";
import ClientContext from "@contexts/ClientContext";

import styles from "./DeleteInvoiceModal.module.css";

const DeleteInvoiceModal = ({ invoice }) => {
  const { notification } = useContext(NotificationContext);
  const { fetchClient } = useContext(ClientContext);

  const router = useRouter();

  const onSubmit = async () => {
    try {
      await deleteInvoice({
        companyId: router.query.companyId as string,
        projectId: router.query.projectId as string,
        clientId: router.query.clientId as string,
        invoiceId: router.query["invoice-id"] as string,
      });

      await fetchClient();

      const temp = router.query;

      delete temp["delete-invoice"];
      delete temp["update-invoice"];
      delete temp["invoice-id"];

      router.replace({ pathname: router.pathname, query: { ...temp } });
    } catch (caught) {
      console.error(caught);
      const { error = "There was an error deleting this invoice" } = caught;

      notification({
        variant: "error",
        title: "Error deleting invoice",
        message: error,
      });
    }
  };

  const onCloseDeleteInvoiceModal = () => {
    const temp = router.query;

    delete temp["delete-invoice"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  return (
    <Modal
      id="delete-invoice-modal"
      title="Delete invoice?"
      onClose={onCloseDeleteInvoiceModal}
      open={!!router?.query["delete-invoice"]}
      actions={[
        {
          text: "Delete invoice",
          variant: "danger",
          onClick: onSubmit,
        },
      ]}
    >
      <p className={styles.modalText}>
        Are you sure you want to delete invoice{" "}
        <span className={styles.bold}>{invoice?.invoiceNumber}</span>?
      </p>
    </Modal>
  );
};

export default DeleteInvoiceModal;
