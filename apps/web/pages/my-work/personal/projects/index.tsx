import { useState, useEffect } from "react";

import Head from "next/head";

import { useRouter } from "next/router";

import formatDate from "@util/formatDate";

import PersonalWrapper from "@modules/personal/PersonalWrapper";

import { PageContent } from "@components/Layout";
import { TableCell } from "@components/Table";
import { ProjectTile } from "@components/Tile";
import { Search, useSearch } from "@components/Search";
import { MultiSelect } from "@components/MultiSelect";
import { Input } from "@components/Input";
import { Priority } from "@components/Priority";
import { Status } from "@components/Status";

import { getUserProjects } from "@ordinly/api-abstraction/users";
import { getPriorities, getStatuses } from "@ordinly/api-abstraction/projects";

import { AddNewProjectSlideout } from "@modules/personal/projects/AddNewProjectSlideout";

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

const Projects = () => {
  const router = useRouter();

  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);

  const search = useSearch({
    onFetchData: getUserProjects,
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
    <PersonalWrapper>
      <Head>
        <title>Projects</title>
      </Head>

      <PageContent
        title="Projects"
        subtitle={`All of your personal projects`}
        breadcrumbs={[
          { text: "Personal", icon: "worker" },
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
          onClickItem={onClickItem}
        />
      </PageContent>

      <AddNewProjectSlideout onSubmit={search.fetchData} />
    </PersonalWrapper>
  );
};

export default Projects;
