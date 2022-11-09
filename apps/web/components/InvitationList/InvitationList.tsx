import { useContext } from "react";

import { useRouter } from "next/router";

import { Icon } from "@components/Icon";

import AcceptInvitationModal from "./AcceptInvitationModal";
import InvitationOverviewSlideout from "./InvitationOverviewSlideout";
import RejectInvitationModal from "./RejectInvitationModal";

import styles from "./InvitationList.module.css";

import { InvitationListProps } from "./types";

const InvitationList = ({ invitations }: InvitationListProps) => {
  const router = useRouter();

  const openOverviewSlideout = async (_id) => {
    await router.replace({
      pathname: router.pathname,
      query: { ...router.query, "invitation-overview": _id },
    });
  };

  const openAcceptModal = async (_id) => {
    await router.replace({
      pathname: router.pathname,
      query: { ...router.query, "accept-invitation": _id },
    });
  };

  const openRejectModal = async (_id) => {
    await router.replace({
      pathname: router.pathname,
      query: { ...router.query, "reject-invitation": _id },
    });
  };

  return (
    <>
      <ul>
        {invitations?.map(
          ({ _id, from: { company, user, project } }, index) => (
            <>
              <li
                className={styles.item}
                onClick={() => openOverviewSlideout(_id)}
              >
                <p className={styles.name}>
                  {project ? project?.name : company?.name}
                </p>

                <div className={styles.actions}>
                  <button
                    className={`${styles.button} ${styles.reject}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      openRejectModal(_id);
                    }}
                  >
                    <Icon icon="close" size={16} />
                  </button>

                  <button
                    className={`${styles.button} ${styles.accept}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      openAcceptModal(_id);
                    }}
                  >
                    <Icon icon="check" size={16} />
                  </button>
                </div>
              </li>

              {index < invitations.length - 1 ? <hr /> : null}
            </>
          )
        )}
      </ul>

      <InvitationOverviewSlideout
        invitations={invitations}
        openAcceptModal={openAcceptModal}
        openRejectModal={openRejectModal}
      />

      <AcceptInvitationModal invitations={invitations} />

      <RejectInvitationModal invitations={invitations} />
    </>
  );
};

export default InvitationList;
