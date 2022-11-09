import { useContext } from "react";

import { useRouter } from "next/router";

import { Card } from "@components/Card";
import { Info } from "@components/Info";

import CompanyContext from "@contexts/CompanyContext";
import ClientContext from "@contexts/ClientContext";

import DetailsSlideout from "./DetailsSlideout";

import styles from "./DetailsCard.module.css";

const DetailsCard = () => {
  const { permissions } = useContext(CompanyContext);
  const { client } = useContext(ClientContext);

  const router = useRouter();

  const openDetailsSlideout = async () => {
    await router.replace({
      pathname: router.pathname,
      query: { ...router.query, "update-client-details": true },
    });
  };

  return (
    <>
      <Card
        title="Client details"
        onEditClick={
          permissions?.clients.edit ? openDetailsSlideout : undefined
        }
      >
        <Info
          data={{
            Name: client?.name,
            Description: client?.description,
          }}
        />
      </Card>

      <DetailsSlideout />
    </>
  );
};

export default DetailsCard;
