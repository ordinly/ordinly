import { useContext } from "react";

import { useRouter } from "next/router";

import { loadStripe } from "@stripe/stripe-js";

import { subscribe } from "@ordinly/api-abstraction/companies";

import { Card } from "@components/Card";
import { ProfilePicture } from "@components/ProfilePicture";
import { Info } from "@components/Info";

import CompanyContext from "@contexts/CompanyContext";

import DetailsSlideout from "./DetailsSlideout";

import styles from "./DetailsCard.module.css";

const DetailsCard = () => {
  const { company, permissions } = useContext(CompanyContext);

  const router = useRouter();

  const openDetailsCard = async () => {
    await router.replace({
      pathname: router.pathname,
      query: { ...router.query, "update-company-details": true },
    });
  };

  const onManageSubscription = async () => {};

  return (
    <div className={styles.container}>
      <Card
        title="Company details"
        onEditClick={permissions?.details?.edit ? openDetailsCard : undefined}
      >
        <div className={styles.contentContainer}>
          <ProfilePicture _id={company?._id} variant="company" />

          <Info
            data={{
              Name: company?.name,
              Description: company?.description,
              Email: company?.emailAddress,
              "Phone number": company?.phoneNumber,
              Owner: company?.owner?.name,
              Public: company?.public ? "True" : "False",
            }}
          />
        </div>
      </Card>

      <DetailsSlideout />
    </div>
  );
};

export default DetailsCard;
