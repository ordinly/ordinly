import { useContext, useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { getUserProjectTaskAnalytics } from "@ordinly/api-abstraction";

import ProjectContext from "@contexts/ProjectContext";

import UserProjectWrapper from "@modules/personal/projects/[projectId]/UserProjectWrapper";

import { PageContent } from "@components/Layout";
import { PieChart } from "@components/PieChart";

import DetailsCard from "@modules/personal/projects/[projectId]/overview/DetailsCard";
import DetailsSlideout from "@modules/personal/projects/[projectId]/overview/DetailsCard/DetailsSlideout";

import styles from "./ProjectOverview.module.css";

const Wrapped = () => (
  <UserProjectWrapper>
    <Overview />
  </UserProjectWrapper>
);

const statusColorMapping = {
  Proposal: "#934df6",
  "Not started": "#393939",
  "On hold": "#d42828",
  "In progress": "#0050f0",
  Complete: "#088a3c",
  Cancelled: "#941349",
  Rejected: "#750606",
  Pending: "#dbb118",
  Active: "#088a3c",
  None: "#393939",
};

const Overview = () => {
  const router = useRouter();

  const { project } = useContext(ProjectContext);

  const [analytics, setAnalytics] = useState([]);

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

  useEffect(() => {
    if (project) {
      (async () => {
        const { tasks } = await getUserProjectTaskAnalytics({
          projectId: project._id,
        });

        setAnalytics(
          tasks.map(({ _id: { status }, count }) => ({
            id: status ? status : "None",
            value: count,
            color: statusColorMapping[status],
          }))
        );
      })();
    }
  }, [project]);

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
          <div className={styles.tile}>
            <h4>Details</h4>

            <DetailsCard />
          </div>

          <div className={styles.tile}>
            <h4>Tasks by status</h4>

            <PieChart data={analytics} />
          </div>

          <div className={styles.tile}>
            <h4>Workload</h4>
          </div>
        </div>

        <DetailsSlideout />
      </PageContent>
    </>
  );
};

export default Wrapped;
