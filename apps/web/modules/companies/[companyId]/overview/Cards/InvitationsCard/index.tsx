import { useContext } from "react";

import { useRouter } from "next/router";

import { Card } from "@components/Card";
import { InvitationList } from "@components/InvitationList";
import { Icon } from "@components/Icon";

import CompanyContext from "@contexts/CompanyContext";

import styles from "./InvitationsCard.module.css";

const InvitationsCard = () => {
  const { company } = useContext(CompanyContext);

  const router = useRouter();

  return (
    <div className={styles.container}>
      <Card title="Invitations">
        {company?.invitations?.length ? (
          <InvitationList invitations={company?.invitations} />
        ) : (
          <div className={styles.noItemsContainer}>
            <Icon icon="empty-items" />
            <p className={styles.noItemsText}>No invitations</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default InvitationsCard;
