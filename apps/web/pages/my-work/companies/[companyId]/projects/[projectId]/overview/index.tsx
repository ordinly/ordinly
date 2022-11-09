import { useContext } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import ProjectContext from "@contexts/ProjectContext";
import CompanyContext from "@contexts/CompanyContext";

import CompanyProjectWrapper from "@modules/companies/[companyId]/projects/[projectId]/CompanyProjectWrapper";
import DetailsCard from "@modules/companies/[companyId]/projects/[projectId]/overview";

import { PageContent } from "@components/Layout";

const Wrapped = () => (
  <CompanyProjectWrapper>
    <Overview />
  </CompanyProjectWrapper>
);

const Overview = () => {
  const router = useRouter();

  const { company } = useContext(CompanyContext);
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
            text: project?.name,
            icon: "project",
            href: `/my-work/companies/${company?._id}/projects`,
          },
          {
            text: "Project overview",
            icon: "overview",
          },
        ]}
      >
        <div>
          <DetailsCard />
        </div>
      </PageContent>
    </>
  );
};

export default Wrapped;
