import { useContext, useCallback, useEffect, useMemo } from "react";

import Head from "next/head";

import { useRouter } from "next/router";

import {
  getCompanyWorkers,
  getCompanyTeams,
  getCompanyRoles,
} from "@ordinly/api-abstraction/companies";

import CompanyWrapper from "@modules/companies/[companyId]/CompanyWrapper";

import CompanyContext from "@contexts/CompanyContext";

import { Tabs } from "@components/Tabs";
import { TableCell } from "@components/Table";
import { WorkerTile, TeamTile, RoleTile } from "@components/Tile";
import { PageContent } from "@components/Layout";
import { Search, useSearch } from "@components/Search";

import {
  AddNewRoleSlideout,
  UpdateRoleSlideout,
} from "@modules/companies/[companyId]/people/Tabs/RolesTab";

import {
  AddNewTeamSlideout,
  UpdateTeamSlideout,
} from "@modules/companies/[companyId]/people/Tabs/TeamsTab";

import {
  AddNewWorkerSlideout,
  UpdateWorkerSlideout,
} from "@modules/companies/[companyId]/people/Tabs/WorkersTab";

import styles from "./People.module.css";

import type { IconType } from "@components/Icon";
import { ButtonProps } from "@components/Button";

const Wrapped = () => (
  <CompanyWrapper>
    <People />
  </CompanyWrapper>
);

const tabs = [
  {
    id: "workers",
    text: "Workers",
    icon: "workers" as IconType,
  },
  {
    id: "teams",
    text: "Teams",
    icon: "team" as IconType,
  },
  {
    id: "roles",
    text: "Roles",
    icon: "role" as IconType,
  },
  /** 
  {
    id: "vendors",
    text: "Vendors",
    icon: "vendor" as IconType,
  },
  */
];

const tabMapping = {
  workers: {
    icon: "workers",
    entity: "workers",
    tile: WorkerTile,
    columns: [
      {
        title: "Name",
        dataKey: "name",
        sticky: true,
        display: ({ data }) => (
          <TableCell sticky style={{ minWidth: "200px" }}>
            <>{data}</>
          </TableCell>
        ),
      },
      {
        title: "Status",
        dataKey: "status",
      },
      {
        title: "Email",
        dataKey: "email",
      },
      {
        title: "Date joined",
        dataKey: "joined",
      },
    ],
  },
  teams: {
    icon: "team",
    entity: "teams",
    tile: TeamTile,
    columns: [
      {
        title: "Name",
        dataKey: "name",
        sticky: true,
        style: { minWidth: "200px" },
      },
      {
        title: "Description",
        dataKey: "description",
      },
      {
        title: "# of members",
        dataKey: "members",
        display: ({ data }) => <TableCell>{data?.length}</TableCell>,
      },
    ],
  },
  roles: {
    icon: "role",
    entity: "roles",
    tile: RoleTile,
    columns: [
      {
        title: "Name",
        dataKey: "name",
        sticky: true,
        style: { minWidth: "200px" },
      },
      {
        title: "Description",
        dataKey: "description",
      },
    ],
  },
  vendors: {},
};

const People = () => {
  const router = useRouter();

  const { company, permissions } = useContext(CompanyContext);

  const onChangeTab = (newTab) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, tab: newTab },
    });
  };

  const onFetchData = useCallback(
    async (values) => {
      if (router.query["companyId"]) {
        if (router.query["tab"] === "workers") {
          return getCompanyWorkers({
            companyId: router.query["companyId"],
            ...values,
          });
        } else if (router.query["tab"] === "teams") {
          return getCompanyTeams({
            companyId: router.query["companyId"],
            ...values,
          });
        } else if (router.query["tab"] === "roles") {
          return getCompanyRoles({
            companyId: router.query["companyId"],
            ...values,
          });
        }
      }
    },
    [router.query["companyId"], router.query["tab"]]
  );

  const search = useSearch({
    onFetchData,
    entity: router?.query["tab"] as string,
  });

  useEffect(() => {
    search.fetchData();
  }, [router?.query["tab"]]);

  const actions = useMemo(() => {
    switch (router?.query["tab"]) {
      case "workers":
        return [
          ...(permissions?.people.workers.add
            ? [
                {
                  id: "invite-worker",
                  text: "Invite workers",
                  onClick: () =>
                    router.push({
                      pathname: router.pathname,
                      query: { ...router.query, invitations: true },
                    }),
                  icon: "add",
                },
              ]
            : []),
        ];
      case "teams":
        return [
          ...(permissions?.people.teams.add
            ? [
                {
                  id: "add-team",
                  text: "Add new team",
                  onClick: () =>
                    router.push({
                      pathname: router.pathname,
                      query: { ...router.query, "add-new-team": true },
                    }),
                  icon: "add",
                },
              ]
            : []),
        ];
      default:
        return [
          ...(permissions?.people.roles.add
            ? [
                {
                  id: "add-role",
                  text: "Add new role",
                  onClick: () =>
                    router.push({
                      pathname: router.pathname,
                      query: { ...router.query, "add-new-role": true },
                    }),
                  icon: "add",
                },
              ]
            : []),
        ];
    }
  }, [router?.query["tab"], permissions]);

  return (
    <>
      <Head>
        <title>People</title>
      </Head>

      <PageContent
        title="People"
        subtitle={`All of the workers, teams, and roles for ${company?.name}`}
        loading={search.loading}
        breadcrumbs={[
          {
            text: `${company?.name}`,
            icon: "company",
          },
          {
            text: "People",
            icon: "people",
          },
        ]}
        actions={actions as ButtonProps[]}
        hasViewToggle
      >
        <Tabs
          id={"people-tabs"}
          tabs={tabs}
          value={router?.query?.tab as string}
          onChange={onChangeTab}
        />

        <div className={styles.searchContainer}>
          <Search
            {...search}
            {...tabMapping[router.query["tab"] as string]}
            filters={[]}
          />
        </div>
      </PageContent>

      <AddNewWorkerSlideout onSubmit={search.fetchData} />

      <UpdateWorkerSlideout onSubmit={search.fetchData} />

      <AddNewTeamSlideout onSubmit={search.fetchData} />

      <UpdateTeamSlideout onSubmit={search.fetchData} />

      <AddNewRoleSlideout onSubmit={search.fetchData} />

      <UpdateRoleSlideout onSubmit={search.fetchData} />
    </>
  );
};

export default Wrapped;
