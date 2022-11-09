import { useContext } from "react";

import Head from "next/head";

import { useRouter } from "next/router";

import { loadStripe } from "@stripe/stripe-js";

import { subscribe } from "@ordinly/api-abstraction/companies";

import { updateCompanySubscription } from "@ordinly/api-abstraction/companies";

import UserContext from "@contexts/UserContext";
import CompanyContext from "@contexts/CompanyContext";
import NotificationContext from "@contexts/NotificationContext";

import CompanyWrapper from "@modules/companies/[companyId]/CompanyWrapper";

import { PageContent } from "@components/Layout";

import DetailsSlideout from "@modules/companies/[companyId]/overview/Cards/DetailsCard/DetailsSlideout";

import InvitationsCard from "@modules/companies/[companyId]/overview/Cards/InvitationsCard";
import CalendarCard from "@modules/companies/[companyId]/overview/Cards/CalendarCard";

import styles from "./Profile.module.css";

import type { ButtonProps } from "@components/Button";

const Wrapped = () => (
  <CompanyWrapper>
    <Overview />
  </CompanyWrapper>
);

const Overview = () => {
  const { user } = useContext(UserContext);
  const { company } = useContext(CompanyContext);
  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  const openDetailsCard = async () => {
    await router.replace({
      pathname: router.pathname,
      query: { ...router.query, "update-company-details": true },
    });
  };

  const onOpenCompanyProfile = () => {
    router.push({
      pathname: `/marketplace/${company?._id}/profile`,
    });
  };

  const onUpdateSubscription = async () => {
    try {
      if (company?.subscription?.active === true) {
        const { sessionURL } = await updateCompanySubscription({
          companyId: company._id,
        });

        window.location.href = sessionURL;
      } else {
        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        );

        const { sessionId } = await subscribe({
          companyId: company._id,
        });

        await stripe.redirectToCheckout({
          sessionId,
        });
      }
    } catch (caught) {
      console.error(caught);
      const {
        error = "There was an error updating this subscription",
      } = caught;

      notification({
        variant: "error",
        title: "Error updating subscription",
        message: error,
      });
    }
  };

  return (
    <>
      <Head>
        <title>{company?.name} overview</title>
      </Head>

      <PageContent
        title={`${company?.name} overview`}
        subtitle={`An overview of what's going on at ${company?.name}`}
        breadcrumbs={[
          {
            text: `${company?.name}`,
            icon: "company",
          },
          {
            text: "Overview",
            icon: "overview",
          },
        ]}
        actions={[
          ...(user?._id === company?.owner
            ? [
                {
                  text: "Manage subscription",
                  variant: "outline",
                  icon: "subscription",
                  onClick: onUpdateSubscription,
                } as ButtonProps,
              ]
            : []),
          {
            text: "Company profile",
            variant: "outline",
            icon: "company-profile",
            onClick: onOpenCompanyProfile,
          },
          ...(user?._id === company?.owner
            ? [
                {
                  text: "Settings",
                  icon: "settings",
                  onClick: openDetailsCard,
                } as ButtonProps,
              ]
            : []),
        ]}
      >
        <div className={styles.container}>
          <InvitationsCard />

          <CalendarCard />
        </div>
      </PageContent>

      <DetailsSlideout />
    </>
  );
};

export default Wrapped;
