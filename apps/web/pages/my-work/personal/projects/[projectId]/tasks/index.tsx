import { useContext, useCallback, useState, useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { getPriorities, getStatuses } from "@ordinly/api-abstraction";
import { getUserProjectTasks } from "@ordinly/api-abstraction";

import formatDate from "@util/formatDate";

import ProjectContext from "@contexts/ProjectContext";
import { TableCell } from "@components/Table";
import { TaskTile } from "@components/Tile";
import { PageContent } from "@components/Layout";
import { Search, useSearch } from "@components/Search";
import { MultiSelect } from "@components/MultiSelect";
import { Input } from "@components/Input";
import { Priority } from "@components/Priority";
import { Status } from "@components/Status";

import UserProjectWrapper from "@modules/personal/projects/[projectId]/UserProjectWrapper";

import AddTaskSlideout from "@modules/personal/projects/[projectId]/tasks/AddNewTaskSlideout";
import UpdateTaskSlideout from "@modules/personal/projects/[projectId]/tasks/UpdateTaskSlideout";

import type { Task } from "@ordinly/api-abstraction";

const Wrapped = () => (
  <UserProjectWrapper>
    <Tasks />
  </UserProjectWrapper>
);

const columns = [
  {
    title: "Name",
    dataKey: "name" as keyof Task,
    sticky: true,
    style: { minWidth: "200px" },
  },
  {
    title: "Status",
    dataKey: "status" as keyof Task,
    display: ({ data }) => (
      <TableCell>
        <Status variant={data} />
      </TableCell>
    ),
  },
  {
    title: "Priority",
    dataKey: "priority" as keyof Task,
    display: ({ data }) => (
      <TableCell>
        <Priority variant={data} />
      </TableCell>
    ),
  },
  {
    title: "Start date",
    dataKey: "startDate" as keyof Task,
    display: ({ data }) => (
      <TableCell>{data ? formatDate(data) : undefined}</TableCell>
    ),
  },
  {
    title: "Due date",
    dataKey: "dueDate" as keyof Task,
    display: ({ data }) => (
      <TableCell>{data ? formatDate(data) : undefined}</TableCell>
    ),
  },
];

const Tasks = () => {
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);

  const { project } = useContext(ProjectContext);

  const router = useRouter();

  const onFetchData = useCallback(
    async (values) => {
      return getUserProjectTasks({
        projectId: router.query["projectId"],
        ...values,
      });
    },
    [router.query["projectId"]]
  );

  const search = useSearch({
    onFetchData,
    entity: "tasks",
  });

  const onOpenAddNew = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "add-task": true,
        step: 0,
      },
    });
  };

  const onClickItem = ({ _id }) => {
    router.replace({
      pathname: router.pathname,
      query: {
        projectId: router.query["projectId"],
        companyId: router.query["companyId"],
        "update-task": true,
        "task-id": _id,
        tab: "details-tab",
        ...(router.query["clientId"]
          ? { clientId: router.query["clientId"] }
          : {}),
      },
    });
  };

  useEffect(() => {
    (async () => {
      const { statuses: newStatuses } = await getStatuses();
      setStatuses(newStatuses);

      const { priorities: newPriorities } = await getPriorities();
      setPriorities(newPriorities);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Tasks</title>
      </Head>

      <PageContent
        title="Tasks"
        subtitle={`All of the tasks that need to get done to complete ${project?.name}`}
        loading={search.loading}
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
            text: "Tasks",
            icon: "task",
          },
        ]}
        actions={[
          {
            text: "Add new task",
            onClick: onOpenAddNew,
            icon: "add",
          },
        ]}
        hasViewToggle
      >
        <Search
          {...search}
          icon="task"
          entity="tasks"
          columns={columns}
          tile={TaskTile}
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

      <UpdateTaskSlideout onSubmit={search.fetchData} tasks={search.items} />

      <AddTaskSlideout onSubmit={search.fetchData} tasks={search.items} />
    </>
  );
};

export default Wrapped;
