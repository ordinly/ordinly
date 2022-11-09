import { useContext, useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import PersonalWrapper from "@modules/personal/PersonalWrapper";

import { PageContent } from "@components/Layout";
import { Grid } from "@components/Grid";
import { Modal } from "@components/Modal";
import { InvitationTile } from "@components/Tile";

import { acceptInvitation, declineInvitation } from "@ordinly/api-abstraction";

import UserContext from "@contexts/UserContext";
import WalkthroughContext from "@contexts/WalkthroughContext";

import styles from "./dashboard.module.css";

const Dashboard = () => {
  const { user, fetchUser } = useContext(UserContext);
  const { setWalkthroughs } = useContext(WalkthroughContext);

  const router = useRouter();

  useEffect(() => {
    setWalkthroughs([
      ...(user?.invitations?.length
        ? [
            {
              id: "how-to-respond-to-invitation-to-company",
              text: "How do I respond to an invitation to a company?",
              walkthrough: [
                {
                  text: 'Click on either the "Accept" or "Decline" button',
                  element: `${user.invitations[0].from.company._id}-invitation-response-buttons`,
                },
              ],
            },
          ]
        : []),
    ]);

    return () => {
      setWalkthroughs(null);
    };
  }, [user]);

  const onOpenAcceptModal = ({ invitationId }) => {
    router.push({
      pathname: router.asPath,
      query: { ...router.query, "accept-invitation": invitationId },
    });
  };

  const onCloseAcceptModal = () => {
    const temp = router.query;
    delete temp["accept-invitation"];
    router.push({
      pathname: router.pathname,
      query: { ...temp },
    });
  };

  const onAcceptInvitation = async () => {
    await acceptInvitation({
      invitationId: router?.query["accept-invitation"] as string,
    });

    await fetchUser();

    onCloseAcceptModal();
  };

  const onOpenDeclineModal = ({ invitationId }) => {
    router.push({
      pathname: router.asPath,
      query: { ...router.query, "decline-invitation": invitationId },
    });
  };

  const onCloseDeclineModal = () => {
    const temp = router.query;
    delete temp["decline-invitation"];
    router.push({
      pathname: router.pathname,
      query: { ...temp },
    });
  };

  const onDeclineInvitation = async () => {
    await declineInvitation({
      invitationId: router?.query["decline-invitation"] as string,
    });

    await fetchUser();

    onCloseDeclineModal();
  };

  return (
    <PersonalWrapper>
      <Head>
        <title>Dashboard</title>
      </Head>

      <PageContent
        title="Dashboard"
        subtitle="A summary of things happening on your account"
        breadcrumbs={[
          { text: "Personal", icon: "worker" },
          { text: "Dashboard", icon: "dashboard" },
        ]}
      >
        {user?.invitations?.length ? (
          <>
            <h2 className={styles.header}>Invitations</h2>

            <Grid noItemsIcon="invitation" noItemsText="No current invitations">
              {user?.invitations?.map(
                ({
                  from: {
                    user: { name: userName },
                    company: { _id, name },
                  },
                }) => (
                  <InvitationTile
                    id={_id}
                    companyName={name}
                    userName={userName}
                    onAcceptInvitation={onOpenAcceptModal}
                    onDeclineInvitation={onOpenDeclineModal}
                  />
                )
              )}
            </Grid>
          </>
        ) : null}
      </PageContent>

      <Modal
        id="accept-invitation-modal"
        open={!!router?.query["accept-invitation"]}
        title={"Accept invitation?"}
        onClose={onCloseAcceptModal}
        actions={[
          {
            text: "Accept",
            onClick: onAcceptInvitation,
          },
        ]}
      >
        <p>
          Are you sure you want to accept the invitation to{" "}
          <span className={styles.modalCompanyName}>
            {
              user?.invitations?.find(
                ({
                  from: {
                    company: { _id },
                  },
                }) => _id === router?.query["accept-invitation"]
              )?.from?.company?.name
            }
          </span>{" "}
          ?
        </p>
      </Modal>

      <Modal
        id="decline-invitation-modal"
        open={!!router?.query["decline-invitation"]}
        title={"Decline invitation?"}
        onClose={onCloseDeclineModal}
        actions={[
          {
            text: "Decline",
            onClick: onDeclineInvitation,
          },
        ]}
      >
        <p>
          {" "}
          Are you sure you want to decline the invitation to{" "}
          <span className={styles.modalCompanyName}>
            {
              user?.invitations?.find(
                ({
                  from: {
                    company: { _id },
                  },
                }) => _id === router?.query["decline-invitation"]
              )?.from?.company?.name
            }
          </span>
          ?
        </p>
      </Modal>
    </PersonalWrapper>
  );
};

export default Dashboard;
