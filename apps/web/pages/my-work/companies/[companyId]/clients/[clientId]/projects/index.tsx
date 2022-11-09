import { useContext, useState, useEffect, useCallback } from "react";

import Head from "next/head";

import { useRouter } from "next/router";

import { getCompanyProjects } from "@ordinly/api-abstraction/companies";
import { getPriorities, getStatuses } from "@ordinly/api-abstraction/projects";

import { PageContent } from "@components/Layout";
import { ProjectTile } from "@components/Tile";
import { Search, useSearch } from "@components/Search";
import { MultiSelect } from "@components/MultiSelect";
import { Input } from "@components/Input";

import CompanyContext from "@contexts/CompanyContext";
import ClientContext from "@contexts/ClientContext";

import ClientWrapper from "@modules/companies/[companyId]/clients/[clientId]/ClientWrapper";

import { AddNewProjectSlideout } from "@modules/companies/[companyId]/projects/AddNewProjectSlideout";

const columns = [
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
  { title: "Status", dataKey: "status" },
  { title: "Priority", dataKey: "priority" },
  { title: "Start date", dataKey: "startDate" },
  { title: "Due date", dataKey: "dueDate" },
];

const Wrapped = () => (
  <ClientWrapper>
    <Projects />
  </ClientWrapper>
);

const Projects = () => {
  const router = useRouter();

  const { company } = useContext(CompanyContext);
  const { client } = useContext(ClientContext);

  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);

  const onFetchData = useCallback(
    async (searchValues) => {
      if (router.query["companyId"] && router.query["clientId"]) {
        return await getCompanyProjects({
          ...searchValues,
          companyId: router.query["companyId"],
          clientIds: [router.query["clientId"]],
        });
      }
    },
    [router.query["companyId"], router.query["clientId"]]
  );

  const search = useSearch({
    onFetchData,
    entity: "projects",
  });

  useEffect(() => {
    (async () => {
      const { statuses: newStatuses } = await getStatuses();
      setStatuses(newStatuses);

      const { priorities: newPriorities } = await getPriorities();
      setPriorities(newPriorities);
    })();
  }, []);

  const onOpenAddNew = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "add-new-project": true,
        step: "0",
      },
    });
  };

  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>

      <PageContent
        title="Projects"
        subtitle={`All of the projects for ${client?.name}`}
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
            text: "Projects",
            icon: "project",
          },
        ]}
        actions={[
          {
            text: "Add new project",
            onClick: onOpenAddNew,
            icon: "add",
          },
        ]}
        hasViewToggle
      >
        <Search
          {...search}
          icon="project"
          entity="projects"
          columns={columns}
          tile={ProjectTile}
          filters={[
            {
              title: "Priority",
              name: "priority",
              component: MultiSelect,
              options: priorities,
            },
            {
              title: "Status",
              name: "status",
              component: MultiSelect,
              options: statuses,
            },
            {
              title: "Start date",
              name: "startDate",
              component: Input,
              htmlType: "date",
            },
            {
              title: "Due date",
              name: "dueDate",
              component: Input,
              htmlType: "date",
            },
          ]}
        />
      </PageContent>

      <AddNewProjectSlideout onSubmit={onFetchData} />
    </>
  );
};

export default Wrapped;
