import { useContext } from "react";

import { useRouter } from "next/router";

import { respondToInvitation } from "@ordinly/api-abstraction";

import CompanyContext from "@contexts/CompanyContext";

import { Modal } from "@components/Modal";

const RejectInvitationModal = ({ invitations }) => {
  const { fetchCompany } = useContext(CompanyContext);

  const router = useRouter();

  const invitation = invitations?.find(
    ({ _id }) => _id === router.query["reject-invitation"]
  );

  const onClose = () => {
    const temp = { ...router.query };

    delete temp["reject-invitation"];

    router.push({ pathname: router.pathname, query: temp });
  };

  return (
    <Modal
      id="reject-invitation-modal"
      title="Reject invitation?"
      onClose={onClose}
      open={!!router?.query["reject-invitation"]}
      actions={[
        {
          text: "Reject",
          onClick: async () => {
            await respondToInvitation({
              companyId: router.query["companyId"] as string,
              invitationId: router.query["reject-invitation"] as string,
              accepted: false,
            });

            await fetchCompany();

            onClose();
          },
          variant: "danger",
        },
      ]}
    >
      <span>
        Are you sure you want to reject this invitation to{" "}
        {invitation?.from?.project ? "collaborate" : "work with"} on{" "}
        <b>
          {invitation?.from?.project.name ?? invitation?.from?.company.name}
        </b>
        ?
      </span>
    </Modal>
  );
};

export default RejectInvitationModal;
