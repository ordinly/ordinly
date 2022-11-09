import { useContext, useCallback } from "react";

import { useRouter } from "next/router";

import { getCompanyClients } from "@ordinly/api-abstraction";

import { PageContent } from "@components/Layout";
import { TableCell } from "@components/Table";
import { ClientTile } from "@components/Tile";
import { Search, useSearch } from "@components/Search";

import CompanyContext from "@contexts/CompanyContext";

import CompanyWrapper from "@modules/companies/[companyId]/CompanyWrapper";

import AddNewClientSlideout from "@modules/companies/[companyId]/clients/AddNewClientSlideout";

import type { Client } from "@ordinly/api-abstraction";

import type { ButtonProps } from "@components/Button";

const columns = [
  {
    title: "Name",
    dataKey: "name" as keyof Client,
    sticky: true,
    style: { minWidth: "200px" },
  },
  {
    title: "Description",
    dataKey: "description" as keyof Client,
  },
  {
    title: "# of projects",
    dataKey: "projects" as keyof Client,
    display: ({ data }) => <TableCell>{data?.length}</TableCell>,
  },
  {
    title: "# of contacts",
    dataKey: "contacts" as keyof Client,
    display: ({ data }) => <TableCell>{data?.length}</TableCell>,
  },
];

const Wrapped = () => (
  <CompanyWrapper>
    <Clients />
  </CompanyWrapper>
);

const Clients = () => {
  const router = useRouter();

  const { company, permissions } = useContext(CompanyContext);

  const onFetchData = useCallback(
    async (searchValues) => {
      if (router.query["companyId"]) {
        return await getCompanyClients({
          ...searchValues,
          companyId: router.query["companyId"],
        });
      }
    },
    [router.query["companyId"]]
  );

  const search = useSearch({
    onFetchData,
    entity: "clients",
  });

  const onOpenAddNewClient = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "add-new-client": true,
        step: 0,
      },
    });
  };

  return (
    <>
      <PageContent
        title="Clients"
        subtitle={`All of the clients that ${company?.name} has dealings with`}
        breadcrumbs={[
          {
            text: `${company?.name}`,
            icon: "company",
          },
          {
            text: "Clients",
            icon: "client",
          },
        ]}
        actions={[
          ...(permissions?.clients?.clients.add
            ? [
                {
                  text: "Add new client",
                  onClick: onOpenAddNewClient,
                  icon: "add",
                } as ButtonProps,
              ]
            : []),
        ]}
        hasViewToggle
      >
        <Search
          {...search}
          icon="client"
          entity="clients"
          columns={columns}
          tile={ClientTile}
        />
      </PageContent>

      <AddNewClientSlideout onSubmit={search.fetchData} />
    </>
  );
};

export default Wrapped;
