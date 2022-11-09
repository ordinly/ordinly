import { useContext } from "react";

import { useRouter } from "next/router";

import { loadStripe } from "@stripe/stripe-js";

import { Button } from "@components/Button";
import { Modal } from "@components/Modal";

import { subscribe } from "@ordinly/api-abstraction/companies";

import CompanyContext from "@contexts/CompanyContext";
import NotificationContext from "@contexts/NotificationContext";

import styles from "./SubscriptionModal.module.css";

const SubscriptionModal = () => {
  const { company } = useContext(CompanyContext);
  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  const onSubmit = async () => {
    try {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );

      const { sessionId } = await subscribe({ companyId: company._id });

      await stripe.redirectToCheckout({
        sessionId,
      });
    } catch (caught) {
      const { error = "There was an error creating this subscription" } =
        caught;

      notification({
        variant: "error",
        title: "Error creating subscription",
        message: error,
      });
    }
  };

  const onCloseSubscriptionModal = () => {
    const temp = router.query;

    delete temp["subscription"];
    delete temp["success"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  return (
    <Modal
      id="subscription-modal"
      title="Create subscription?"
      onClose={onCloseSubscriptionModal}
      open={!!router?.query["subscription"]}
      actions={[
        {
          text: "Add payment method",
          onClick: onSubmit,
        },
      ]}
    >
      <p className={styles.modalText}>
        To add more workers, you'll need to add a payment method for this
        company
      </p>
    </Modal>
  );
};

export default SubscriptionModal;
