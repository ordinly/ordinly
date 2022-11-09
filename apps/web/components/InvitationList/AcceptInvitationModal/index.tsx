import { useContext, useCallback } from "react";

import { useRouter } from "next/router";

import { getCompanyClients } from "@ordinly/api-abstraction/companies";

import { respondToInvitation } from "@ordinly/api-abstraction/companies";

import CompanyContext from "@contexts/CompanyContext";

import { Modal } from "@components/Modal";
import { SearchSelect } from "@components/SearchSelect";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Radio } from "@components/Radio";

const AcceptInvitationModal = ({ invitations }) => {
  const { company, fetchCompany } = useContext(CompanyContext);

  const router = useRouter();

  const invitation = invitations?.find(
    ({ _id }) => _id === router.query["accept-invitation"]
  );

  const onSubmit = async (values, form) => {
    await respondToInvitation({
      companyId: router.query["companyId"] as string,
      invitationId: router.query["accept-invitation"] as string,
      accepted: true,
      ...values,
    });

    await fetchCompany();

    onClose(form);
  };

  const onClose = (form) => {
    const temp = { ...router.query };

    delete temp["accept-invitation"];

    form.restart();

    router.push({ pathname: router.pathname, query: temp });
  };

  const fetchClients = useCallback(() => {
    if (company?._id) {
      return getCompanyClients({ companyId: company?._id });
    }
  }, [company]);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ form, handleSubmit }) => {
        return (
          <Modal
            id="accept-invitation-modal"
            title="Accept invitation?"
            onClose={() => onClose(form)}
            open={!!router?.query["accept-invitation"]}
            actions={[
              {
                text: "Accept",
                onClick: handleSubmit,
                variant: "success",
              },
            ]}
          >
            <p>
              Are you sure you want to accept this invitation to{" "}
              {invitation?.from?.project ? "collaborate" : "work with"} on{" "}
              <b>
                {invitation?.from?.project.name ??
                  invitation?.from?.company.name}
              </b>
              ?
            </p>

            <Field
              title="Client"
              name="clientId"
              component={SearchSelect}
              id="new-project-invitations-select"
              onFetchData={fetchClients}
              entity="clients"
              helper="You can associate this project to a client"
            />
          </Modal>
        );
      }}
    />
  );
};

export default AcceptInvitationModal;
