import { useContext, useState, useEffect, useCallback } from "react";

import Head from "next/head";

import { useRouter } from "next/router";

import { getCompanyProjectTasks } from "@ordinly/api-abstraction/companies";
import { getPriorities, getStatuses } from "@ordinly/api-abstraction/projects";

import CompanyClientProjectWrapper from "@modules/companies/[companyId]/clients/[clientId]/projects/[projectId]/CompanyClientProjectWrapper";

import ProjectContext from "@contexts/ProjectContext";
import CompanyContext from "@contexts/CompanyContext";
import ClientContext from "@contexts/ClientContext";

import { PageContent } from "@components/Layout";
import { TaskTile } from "@components/Tile";
import { Search, useSearch } from "@components/Search";
import { MultiSelect } from "@components/MultiSelect";
import { Input } from "@components/Input";
import { TableCell } from "@components/Table";

import AddTaskSlideout from "@modules/companies/[companyId]/projects/[projectId]/tasks/AddNewTaskSlideout";
import UpdateTaskSlideout from "@modules/companies/[companyId]/projects/[projectId]/tasks/UpdateTaskSlideout";

import type { Task } from "@ordinly/api-abstraction/companies";

const Wrapped = () => (
  <CompanyClientProjectWrapper>
    <Tasks />
  </CompanyClientProjectWrapper>
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
  },
  {
    title: "Description",
    dataKey: "description" as keyof Task,
  },
  {
    title: "Priority",
    dataKey: "priority" as keyof Task,
  },
  {
    title: "Start date",
    dataKey: "startDate" as keyof Task,
  },
  {
    title: "Due date",
    dataKey: "dueDate" as keyof Task,
  },
  {
    title: "# of subtasks",
    dataKey: "subtasks" as keyof Task,
    display: ({ data }) => <TableCell>{data?.length}</TableCell>,
  },
];

const Tasks = () => {
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);

  const { company } = useContext(CompanyContext);
  const { client } = useContext(ClientContext);
  const { project } = useContext(ProjectContext);

  const router = useRouter();

  const onFetchData = useCallback(
    async (values) => {
      if (router.query["projectId"] && router.query["companyId"]) {
        return getCompanyProjectTasks({
          projectId: router.query["projectId"],
          companyId: router.query["companyId"],
          ...values,
        });
      }
    },
    [router.query["projectId"], router.query["companyId"]]
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
        />
      </PageContent>

      {router.query["update-task"] && (
        <UpdateTaskSlideout
          onSubmit={search.fetchData}
          tasks={project?.tasks}
        />
      )}

      <AddTaskSlideout onSubmit={search.fetchData} tasks={project?.tasks} />
    </>
  );
};

export default Wrapped;
