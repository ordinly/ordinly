import { useContext, useState, useEffect, useCallback } from "react";

import Head from "next/head";

import { useRouter } from "next/router";

import formatDate from "@util/formatDate";

import { getCompanyProjects } from "@ordinly/api-abstraction";
import { getPriorities, getStatuses } from "@ordinly/api-abstraction";

import { PageContent } from "@components/Layout";
import { ProjectTile } from "@components/Tile";
import { Search, useSearch } from "@components/Search";
import { MultiSelect } from "@components/MultiSelect";
import { Input } from "@components/Input";
import { TableCell } from "@components/Table";
import { Priority } from "@components/Priority";
import { Status } from "@components/Status";

import CompanyContext from "@contexts/CompanyContext";

import CompanyWrapper from "@modules/companies/[companyId]/CompanyWrapper";
import { AddNewProjectSlideout } from "@modules/companies/[companyId]/projects/AddNewProjectSlideout";
import { ButtonProps } from "@components/Button";

const columns = [
  {
    title: "Name",
    dataKey: "name",
    sticky: true,
    style: { minWidth: "200px" },
  },
  {
    title: "Status",
    dataKey: "status",
    display: ({ data }) => (
      <TableCell>
        <Status variant={data} />
      </TableCell>
    ),
  },
  {
    title: "Priority",
    dataKey: "priority",
    display: ({ data }) => (
      <TableCell>
        <Priority variant={data} />
      </TableCell>
    ),
  },
  {
    title: "Start date",
    dataKey: "startDate",
    display: ({ data }) => (
      <TableCell>{data ? formatDate(data) : undefined}</TableCell>
    ),
  },
  {
    title: "Due date",
    dataKey: "dueDate",
    display: ({ data }) => (
      <TableCell>{data ? formatDate(data) : undefined}</TableCell>
    ),
  },
];

const Wrapped = () => (
  <CompanyWrapper>
    <Projects />
  </CompanyWrapper>
);

const Projects = () => {
  const router = useRouter();

  const { company } = useContext(CompanyContext);

  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);

  const onFetchData = useCallback(
    async (searchValues) => {
      if (router.query["companyId"]) {
        return await getCompanyProjects({
          ...searchValues,
          companyId: router.query["companyId"],
        });
      }
    },
    [router.query["companyId"]]
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

  const onClickItem = ({ _id }) => {
    router.push({
      pathname: `${router.pathname}/[projectId]/overview`,
      query: {
        ...router.query,
        projectId: _id,
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
        subtitle={`All of the projects that ${company?.name} has worked on`}
        breadcrumbs={[
          {
            text: `${company?.name}`,
            icon: "company",
          },
          {
            text: "Projects",
            icon: "project",
          },
        ]}
        actions={[
          ...(company?.permissions?.projects.projects.add
            ? [
                {
                  text: "Add new project",
                  onClick: onOpenAddNew,
                  icon: "add",
                } as ButtonProps,
              ]
            : []),
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
          onClickItem={onClickItem}
        />
      </PageContent>

      <AddNewProjectSlideout onSubmit={search.fetchData} />
    </>
  );
};

export default Wrapped;
