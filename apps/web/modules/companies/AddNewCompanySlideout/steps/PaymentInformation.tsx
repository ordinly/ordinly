import { Icon } from "@components/Icon";

import styles from "./PaymentInformation.module.css";

const PaymentInformationStep = () => {
  return (
    <>
      <div className={styles.pricingContainer}>
        <h3 className={styles.price}>
          $14.99<span className={styles.perWorker}> / worker*</span>
        </h3>
      </div>

      <div className={styles.feature}>
        <span className={styles.check}>
          <Icon icon="check" />
        </span>{" "}
        Unlimited projects
      </div>

      <div className={styles.feature}>
        <span className={styles.check}>
          <Icon icon="check" />
        </span>{" "}
        Unlimited Quotes / invoices
      </div>

      <div className={styles.feature}>
        <span className={styles.check}>
          <Icon icon="check" />
        </span>{" "}
        Cloud file storage
      </div>

      <p className={styles.description}>
        *30 day free trial, then $14.99 per worker in your company, billed
        monthly. Cancel anytime.
      </p>
    </>
  );
};

export default PaymentInformationStep;
