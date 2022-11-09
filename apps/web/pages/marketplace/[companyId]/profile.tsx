import { useEffect, useState, useContext } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { useSpring, animated } from "@react-spring/web";

import { getCompanyProfile } from "@ordinly/api-abstraction/companies";

import { Button } from "@components/Button";
import { RatingStars } from "@components/RatingStars";
import { Tabs } from "@components/Tabs";
import { Tag } from "@components/Tag";

import UserContext from "@contexts/UserContext";

import AddReviewModal from "@modules/marketplace/[companyId]/profile/AddReviewModal";
import MustBeLoggedInModal from "@modules/marketplace/[companyId]/profile/MustBeLoggedInModal";
import OverviewSection from "@modules/marketplace/[companyId]/profile/OverviewSection";
import TabsSection from "@modules/marketplace/[companyId]/profile/TabsSection";

import ReviewsTab from "@modules/marketplace/[companyId]/profile/ReviewsTab";

import styles from "./Profile.module.css";

const Profile = () => {
  const router = useRouter();

  const transitionBottom = useSpring({
    from: { opacity: 0, y: 100 },
    to: { opacity: 1, y: 0 },
    delay: 100,
  });

  useEffect(() => {
    if (!router.query.tab) {
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, tab: "posts" },
      });
    }
  }, []);

  const onTabChange = (newTab) => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, tab: newTab },
    });
  };

  const onOpenMustBeLoggedInModal = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, "must-be-logged-in": true },
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.column}>
          <OverviewSection
            onOpenMustBeLoggedInModal={onOpenMustBeLoggedInModal}
          />

          <TabsSection />
        </div>
      </div>

      <MustBeLoggedInModal />
    </>
  );
};

export default Profile;
