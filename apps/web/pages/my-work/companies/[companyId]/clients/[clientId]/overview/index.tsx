import { useContext } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import CompanyContext from "@contexts/CompanyContext";
import ClientContext from "@contexts/ClientContext";

import ClientWrapper from "@modules/companies/[companyId]/clients/[clientId]/ClientWrapper";
import DetailsCard from "@modules/companies/[companyId]/clients/[clientId]/overview/cards/DetailsCard";

import { PageContent } from "@components/Layout";

import styles from "./overview.module.css";

const Wrapped = () => (
  <ClientWrapper>
    <ClientOverview />
  </ClientWrapper>
);

const ClientOverview = () => {
  const router = useRouter();

  const { company } = useContext(CompanyContext);
  const { client } = useContext(ClientContext);

  return (
    <>
      <Head>
        <title>Client overview</title>
      </Head>

      <PageContent
        title="Client overview"
        subtitle={`An overview of what's going on with ${client?.name}`}
        breadcrumbs={[
          {
            text: `${company?.name}`,
            icon: "company",
          },
          {
            text: client?.name,
            icon: "clients",
            href: {
              pathname: `/my-work/companies/${company?._id}/clients`,
              query: router.query,
            },
          },
          {
            text: "Client overview",
            icon: "overview",
          },
        ]}
      >
        <div className={styles.container}>
          <DetailsCard />
        </div>
      </PageContent>
    </>
  );
};

export default Wrapped;
