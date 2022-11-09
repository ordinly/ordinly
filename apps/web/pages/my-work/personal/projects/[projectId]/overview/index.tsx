import { useContext } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import ProjectContext from "@contexts/ProjectContext";

import UserProjectWrapper from "@modules/personal/projects/[projectId]/UserProjectWrapper";

import { PageContent } from "@components/Layout";

import DetailsCard from "@modules/personal/projects/[projectId]/overview/DetailsCard";
import DetailsSlideout from "@modules/personal/projects/[projectId]/overview/DetailsCard/DetailsSlideout";

import styles from "./ProjectOverview.module.css";

const Wrapped = () => (
  <UserProjectWrapper>
    <Overview />
  </UserProjectWrapper>
);

const Overview = () => {
  const router = useRouter();

  const { project } = useContext(ProjectContext);

  const openDetailsSlideout = async () => {
    await router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        "update-project-details": true,
        tab: "details-tab",
      },
    });
  };

  return (
    <>
      <Head>
        <title>Project overview</title>
      </Head>

      <PageContent
        title="Project overview"
        subtitle={`An overview of everything regarding ${project?.name}`}
        breadcrumbs={[
          { text: "Personal", icon: "worker" },
          {
            text: project?.name,
            icon: "project",
            href: {
              pathname: `/my-work/personal/projects`,
              query: router.query,
            },
          },
          {
            text: "Project overview",
            icon: "overview",
          },
        ]}
        actions={[
          {
            text: "Edit project details",
            icon: "edit",
            onClick: openDetailsSlideout,
          },
        ]}
      >
        <div className={styles.container}>
          <DetailsCard />
        </div>

        <DetailsSlideout />
      </PageContent>
    </>
  );
};

export default Wrapped;
