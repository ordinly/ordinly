import { useContext } from "react";

import { useRouter } from "next/router";

import { Card } from "@components/Card";

import CompanyContext from "@contexts/CompanyContext";

import ContactInfoSlideout from "./ContactInfoSlideout";

import { phoneMask } from "@util/masks";

import styles from "./ContactInfoCard.module.css";

const ContactInfoCard = () => {
  const { company, permissions } = useContext(CompanyContext);

  const router = useRouter();

  const openContactInfoSlideout = async () => {
    await router.replace({
      pathname: router.pathname,
      query: { ...router.query, "update-contact-info": true },
    });
  };

  return (
    <>
      <Card
        title="Contact info."
        onEditClick={
          permissions?.details?.edit ? openContactInfoSlideout : undefined
        }
      >
        <div className={styles.section}>
          <h4 className={styles.subtiitle}>Email addresses</h4>
          {company?.emailAddresses?.length ? (
            <ul>
              {company.emailAddresses.map((value) => (
                <li className={styles.emailAddress}>{value}</li>
              ))}
            </ul>
          ) : (
            <div className={styles.noData}>No emails to display</div>
          )}
        </div>

        <div>
          <h4 className={styles.subtiitle}>Phone numbers</h4>
          {company?.phoneNumbers?.length ? (
            <ul>
              {company.phoneNumbers.map((value) => (
                <li className={styles.phoneNumber}>{phoneMask(value)}</li>
              ))}
            </ul>
          ) : (
            <div className={styles.noData}>No phone numbers to display</div>
          )}
        </div>
      </Card>

      <ContactInfoSlideout />
    </>
  );
};

export default ContactInfoCard;
