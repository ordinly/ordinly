import Head from "next/head";

import PersonalWrapper from "@modules/personal/PersonalWrapper";

import { PageContent } from "@components/Layout";

import DetailsCard from "@modules/account/Cards/DetailsCard";

const Account = () => {
  return (
    <PersonalWrapper>
      <Head>
        <title>Account</title>
      </Head>

      <PageContent
        title="Account"
        subtitle="All your account information"
        breadcrumbs={[
          { text: "Personal", icon: "worker" },
          { text: "Account", icon: "account" },
        ]}
      >
        <DetailsCard />
      </PageContent>
    </PersonalWrapper>
  );
};

export default Account;
