import { useContext, useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import ProjectContext from "@contexts/ProjectContext";
import CompanyContext from "@contexts/CompanyContext";
import ClientContext from "@contexts/ClientContext";

import CompanyClientProjectWrapper from "@modules/companies/[companyId]/clients/[clientId]/projects/[projectId]/CompanyClientProjectWrapper";

import { PageContent } from "@components/Layout";

import DetailsCard from "@modules/companies/[companyId]/clients/[clientId]/projects/[projectId]/overview/Cards/DetailsCard";
import AssigneesCard from "@modules/companies/[companyId]/clients/[clientId]/projects/[projectId]/overview/Cards/AssigneesCard";
import CalendarCard from "@modules/companies/[companyId]/clients/[clientId]/projects/[projectId]/overview/Cards/CalendarCard";

import styles from "./ProjectOverview.module.css";

const Wrapped = () => (
  <CompanyClientProjectWrapper>
    <Overview />
  </CompanyClientProjectWrapper>
);

const Overview = () => {
  const router = useRouter();

  const { company } = useContext(CompanyContext);
  const { client } = useContext(ClientContext);
  const { project } = useContext(ProjectContext);

  return (
    <>
      <Head>
        <title>Project overview</title>
      </Head>

      <PageContent
        title="Project overview"
        subtitle={`An overview of everything regarding ${project?.name}`}
        breadcrumbs={[
          {
            text: `${company?.name}`,
            icon: "company",
          },
          {
            text: client?.name,
            icon: "clients",
            href: `/my-work/companies/${company?._id}/clients`,
          },
          {
            text: project?.name,
            icon: "project",
            href: `/my-work/companies/${company?._id}/clients/${client?._id}/projects`,
          },
          {
            text: "Project overview",
            icon: "overview",
          },
        ]}
      >
        <div className={styles.container}>
          <div className={styles.tile}>
            <DetailsCard />
          </div>

          <div className={styles.tile}>
            <AssigneesCard />
          </div>

          <div className={styles.tile}>
            <CalendarCard />
          </div>
        </div>
      </PageContent>
    </>
  );
};

export default Wrapped;
