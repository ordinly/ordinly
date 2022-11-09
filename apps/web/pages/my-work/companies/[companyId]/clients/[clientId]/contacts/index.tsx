import { useContext, useState, useEffect, useCallback } from "react";

import Head from "next/head";

import { useRouter } from "next/router";

import { getCompanyClientContacts } from "@ordinly/api-abstraction/companies";

import { ContactTile } from "@components/Tile";

import { PageContent } from "@components/Layout";
import { Search, useSearch } from "@components/Search";

import CompanyContext from "@contexts/CompanyContext";
import ClientContext from "@contexts/ClientContext";

import ClientWrapper from "@modules/companies/[companyId]/clients/[clientId]/ClientWrapper";

import AddNewContactSlideout from "@modules/companies/[companyId]/clients/[clientId]/contacts/AddNewContactSlideout";
import UpdateContactSlideout from "@modules/companies/[companyId]/clients/[clientId]/contacts/UpdateContactSlideout";

import type { ContactType } from "@ordinly/api-abstraction/companies";

const columns = [
  {
    title: "Name",
    dataKey: "name" as keyof ContactType,
    sticky: true,
    style: { minWidth: "200px" },
  },
  {
    title: "Email",
    dataKey: "email" as keyof ContactType,
  },
  {
    title: "Phone number",
    dataKey: "phoneNumber" as keyof ContactType,
  },
];

const Wrapped = () => (
  <ClientWrapper>
    <Contacts />
  </ClientWrapper>
);

const Contacts = () => {
  const router = useRouter();

  const { company } = useContext(CompanyContext);
  const { client } = useContext(ClientContext);

  const onFetchData = useCallback(
    async (searchValues) => {
      if (router.query["companyId"]) {
        return await getCompanyClientContacts({
          ...searchValues,
          companyId: router.query["companyId"],
          clientId: router.query["clientId"],
        });
      }
    },
    [router.query["companyId"]]
  );

  const search = useSearch({
    onFetchData,
    entity: "contacts",
  });

  const onOpenAddNew = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "add-new-contact": true,
        step: 0,
      },
    });
  };

  const onOpenDetails = ({ _id }) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "update-contact": true,
        "contact-id": _id,
        tab: "details-tab",
      },
    });
  };

  return (
    <>
      <Head>
        <title>Contacts</title>
      </Head>

      <PageContent
        title="Contacts"
        subtitle={`All of the contacts for ${client?.name}`}
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
            text: "Contacts",
            icon: "contacts",
          },
        ]}
        actions={[
          {
            text: "Add new contact",
            onClick: onOpenAddNew,
            icon: "add",
          },
        ]}
        hasViewToggle
      >
        <Search
          {...search}
          icon="contacts"
          entity="contacts"
          columns={columns}
          tile={ContactTile}
          onClickItem={onOpenDetails}
        />
      </PageContent>

      <AddNewContactSlideout onSubmit={search.fetchData} />

      <UpdateContactSlideout onSubmit={search.fetchData} />
    </>
  );
};

export default Wrapped;
