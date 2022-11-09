import { useContext } from "react";

import { useRouter } from "next/router";

import { Button } from "@components/Button";
import { Modal } from "@components/Modal";

import { deleteQuote } from "@ordinly/api-abstraction/companies";

import NotificationContext from "@contexts/NotificationContext";
import ClientContext from "@contexts/ClientContext";

import styles from "./DeleteQuoteModal.module.css";

const DeleteQuoteModal = ({ quote }) => {
  const { notification } = useContext(NotificationContext);
  const { fetchClient } = useContext(ClientContext);

  const router = useRouter();

  const onSubmit = async () => {
    try {
      await deleteQuote({
        companyId: router.query.companyId as string,
        clientId: router.query.clientId as string,
        quoteId: router.query["quote-id"] as string,
        projectId: router.query["projectId"] as string,
      });

      await fetchClient();

      const temp = router.query;

      delete temp["delete-quote"];
      delete temp["update-quote"];
      delete temp["quote-id"];

      router.replace({ pathname: router.pathname, query: { ...temp } });
    } catch (caught) {
      console.error(caught);
      const { error = "There was an error deleting this quote" } = caught;

      notification({
        variant: "error",
        title: "Error deleting quote",
        message: error,
      });
    }
  };

  const onCloseDeleteQuoteModal = () => {
    const temp = router.query;

    delete temp["delete-quote"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  return (
    <Modal
      id="delete-quote-modal"
      title="Delete quote?"
      onClose={onCloseDeleteQuoteModal}
      open={!!router?.query["delete-quote"]}
      actions={[{ text: "Delete quote", variant: "danger", onClick: onSubmit }]}
    >
      <p className={styles.modalText}>
        Are you sure you want to delete quote{" "}
        <span className={styles.bold}>{quote?.quoteNumber}</span>?
      </p>
    </Modal>
  );
};

export default DeleteQuoteModal;
