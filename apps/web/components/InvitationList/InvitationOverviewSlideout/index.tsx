import { useRouter } from "next/router";

import { Slideout } from "@components/Slideout";

const InvitationOverviewSlideout = ({
  invitations,
  openRejectModal,
  openAcceptModal,
}) => {
  const router = useRouter();

  const invitation = invitations?.find(
    ({ _id }) => _id === router.query["invitation-overview"]
  );

  const onClose = () => {
    const temp = { ...router.query };

    delete temp["invitation-overview"];

    router.push({ pathname: router.pathname, query: temp });
  };

  return (
    <Slideout
      id="invitation-overview-slideout"
      title="Invitation overview"
      open={!!router.query["invitation-overview"]}
      onClose={onClose}
      actions={[
        {
          id: "reject-invitation-button",
          text: "Reject",
          variant: "danger",
          onClick: () => openRejectModal(router.query["invitation-overview"]),
        },
        {
          id: "accept-invitation-button",
          text: "Accept",
          onClick: () => openAcceptModal(router.query["invitation-overview"]),
          variant: "success",
        },
      ]}
    >
      {invitation?.from?.project ? (
        <>
          <b>{invitation?.from?.user?.name}</b> has invited you to work with
          them on their personal project{" "}
          <b>{invitation?.from?.project?.name}</b>
        </>
      ) : (
        <>
          <b>{invitation?.from?.company?.name}</b> has invited you to
          collaborate with them
        </>
      )}
    </Slideout>
  );
};

export default InvitationOverviewSlideout;
