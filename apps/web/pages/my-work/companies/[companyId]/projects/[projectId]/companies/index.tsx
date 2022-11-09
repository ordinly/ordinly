import { useContext, useCallback } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { getCompanyProjectCompanies } from "@ordinly/api-abstraction";

import ProjectContext from "@contexts/ProjectContext";
import CompanyContext from "@contexts/CompanyContext";

import CompanyProjectWrapper from "@modules/companies/[companyId]/projects/[projectId]/CompanyProjectWrapper";
import InviteCompaniesSlideout from "@modules/companies/[companyId]/projects/[projectId]/companies/InviteCompaniesSlideout";
import CompanyOverviewSlideout from "@modules/companies/[companyId]/projects/[projectId]/CompanyOverviewSlideout";

import { PageContent } from "@components/Layout";
import { CompanyTile } from "@components/Tile";
import { Search, useSearch } from "@components/Search";

type CompanyType = {
  name: string;
  description: string;
};

const columns = [
  {
    title: "Name",
    dataKey: "name" as keyof CompanyType,
    sticky: true,
    style: { minWidth: "200px" },
  },
  {
    title: "Description",
    dataKey: "description" as keyof CompanyType,
  },
];

const Wrapped = () => (
  <CompanyProjectWrapper>
    <Companies />
  </CompanyProjectWrapper>
);

const Companies = () => {
  const router = useRouter();

  const { company } = useContext(CompanyContext);

  const { project } = useContext(ProjectContext);

  const onFetchData = useCallback(
    async (values) => {
      return await getCompanyProjectCompanies({
        ...values,
        projectId: router.query["projectId"],
        companyId: router.query["companyId"],
      });
    },
    [router.query["projectId"]]
  );

  const search = useSearch({
    onFetchData,
    entity: "companies",
  });

  const onOpenInvite = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "invite-companies": true,
      },
    });
  };

  const onClickItem = ({ _id }) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "company-details": true,
        "company-id": _id,
      },
    });
  };

  return (
    <>
      <Head>
        <title>Companies</title>
      </Head>

      <PageContent
        title="Companies"
        subtitle={"The companies that have been invited to this project"}
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
            text: "Companies",
            icon: "company",
          },
        ]}
        actions={
          project?.permissions?.companies.add &&
          company?.permissions?.projects?.companies?.add
            ? [
                {
                  icon: "add",
                  text: "Invite companies",
                  onClick: onOpenInvite,
                },
              ]
            : undefined
        }
        hasViewToggle
      >
        <Search
          {...search}
          icon="company"
          entity="companies"
          columns={columns}
          tile={CompanyTile}
          onClickItem={onClickItem}
        />
      </PageContent>

      <InviteCompaniesSlideout onSubmit={search.fetchData} />

      <CompanyOverviewSlideout onSubmit={search.fetchData} />
    </>
  );
};

export default Wrapped;
