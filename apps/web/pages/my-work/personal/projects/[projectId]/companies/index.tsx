import { useContext, useCallback } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { getUserProjectCompanies } from "@ordinly/api-abstraction/users";

import ProjectContext from "@contexts/ProjectContext";

import UserProjectWrapper from "@modules/personal/projects/[projectId]/UserProjectWrapper";
import InviteCompaniesSlideout from "@modules/personal/projects/[projectId]/companies/InviteCompaniesSlideout";
import CompanyOverviewSlideout from "@modules/personal/projects/[projectId]/companies/CompanyOverviewSlideout";

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
  <UserProjectWrapper>
    <Companies />
  </UserProjectWrapper>
);

const Companies = () => {
  const router = useRouter();

  const { project } = useContext(ProjectContext);

  const onFetchData = useCallback(
    async (values) => {
      return await getUserProjectCompanies({
        ...values,
        projectId: router.query["projectId"],
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
            text: "Companies",
            icon: "company",
          },
        ]}
        actions={[
          {
            icon: "add",
            text: "Invite companies",
            onClick: onOpenInvite,
          },
        ]}
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

      <CompanyOverviewSlideout
        company={search?.items?.find(
          ({ _id }) => _id === router?.query["company-id"]
        )}
        onSubmit={search.fetchData}
      />
    </>
  );
};

export default Wrapped;
