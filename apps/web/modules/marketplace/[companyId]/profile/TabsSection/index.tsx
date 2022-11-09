import { useEffect } from "react";

import { useRouter } from "next/router";

import { useSpring, animated } from "@react-spring/web";

import { Tabs } from "@components/Tabs";

import ReviewsTab from "@modules/marketplace/[companyId]/profile/ReviewsTab";

import styles from "./TabsSection.module.css";

const TabsSection = () => {
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
      <animated.div
        className={styles.contentContainer}
        style={transitionBottom}
      >
        <div className={styles.tabContainer}>
          {router.query.tab === "reviews" ? <ReviewsTab /> : null}
        </div>
      </animated.div>
    </>
  );
};

export default TabsSection;
