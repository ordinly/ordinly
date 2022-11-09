import { useContext } from "react";

import { useRouter } from "next/router";

import { searchCompanies } from "@ordinly/api-abstraction/companies";
import { inviteCompaniesToCompanyProject } from "@ordinly/api-abstraction/companies";

import ProjectContext from "@contexts/ProjectContext";
import CompanyContext from "@contexts/CompanyContext";
import NotificationContext from "@contexts/NotificationContext";

import { Form } from "@components/Form";
import { Slideout } from "@components/Slideout";
import { Field } from "@components/Field";
import { SearchSelect } from "@components/SearchSelect";

const InviteCompaniesSlideout = ({ onSubmit: onSubmitProp }) => {
  const { company } = useContext(CompanyContext);
  const { project, fetchProject } = useContext(ProjectContext);
  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  const onSubmit = async ({ invitations }, form) => {
    try {
      await inviteCompaniesToCompanyProject({
        projectId: project?._id,
        companyId: router.query["companyId"] as string,
        invitations,
      });

      await fetchProject();

      onClose(form);

      onSubmitProp();
    } catch (caught) {
      const { error = "There was an error inviting these companies" } = caught;

      notification({
        variant: "error",
        title: "Error inviting companies",
        message: error,
      });
    }
  };

  const onClose = (form?: any) => {
    const temp = { ...router.query };

    delete temp["invite-companies"];

    if (form) {
      form.restart();
    }

    router.push({ pathname: router.pathname, query: temp });
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <Slideout
            id="invite-companies-slideout"
            title="Invite companies"
            open={!!router.query["invite-companies"]}
            onClose={() => onClose()}
            actions={[
              {
                id: "submit-invites-button",
                text: "Invite companies",
                onClick: handleSubmit,
                type: "submit" as "submit",
              },
            ]}
          >
            <Field
              title="Search for companies to invite"
              name="invitations"
              multi
              component={SearchSelect}
              id="new-project-invitations-select"
              onFetchData={searchCompanies}
              entity="companies:project"
              exclude={[...(project?.companies || []), company?._id]}
            />
          </Slideout>
        );
      }}
    />
  );
};

export default InviteCompaniesSlideout;
