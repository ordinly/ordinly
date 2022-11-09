import { useContext } from "react";

import { useRouter } from "next/router";

import {
  revokeInvitationToPersonalProject,
  updateInvitationToPersonalProject,
  updateCompanyPermissionsOnPersonalProject,
  removeCompanyFromPersonalProject,
} from "@ordinly/api-abstraction/users";

import ProjectContext from "@contexts/ProjectContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { PermissionsInput } from "@components/PermissionsInput";
import { Modal } from "@components/Modal";

import styles from "./CompanyOverviewSlideout.module.css";

import type { ButtonProps } from "@components/Button";

const CompanyOverviewSlideout = ({ company, onSubmit: onSubmitCallback }) => {
  const { project, fetchProject } = useContext(ProjectContext);

  const router = useRouter();

  const onRemoveCompany = async (form) => {
    await removeCompanyFromPersonalProject({
      projectId: project?._id,
      companyId: company?._id,
    });

    await fetchProject();

    onClose(form);

    onSubmitCallback();
  };

  const onRevokeInvitation = async (form) => {
    await revokeInvitationToPersonalProject({
      projectId: project?._id,
      invitationId: company?.invitationId,
    });

    await fetchProject();

    onClose(form);

    onSubmitCallback();
  };

  const onClose = (form) => {
    const temp = { ...router.query };

    delete temp["company-details"];
    delete temp["revoke-invitation"];
    delete temp["remove-company"];

    if (form) {
      form.restart();
    }

    router.push({ pathname: router.pathname, query: temp });
  };

  const onSubmit = async (values, form) => {
    if (company?.pending) {
      await updateInvitationToPersonalProject({
        invitationId: company?.invitationId,
        projectId: project?._id,
        ...values,
      });
    } else {
      await updateCompanyPermissionsOnPersonalProject({
        companyId: company?._id,
        projectId: project?._id,
        ...values,
      });
    }

    onSubmitCallback();

    onClose(form);
  };

  const onOpenRevokeInvitationModal = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "revoke-invitation": true,
      },
    });
  };

  const onCloseRevokeInviteModal = () => {
    const temp = { ...router.query };

    delete temp["revoke-invitation"];

    router.push({ pathname: router.pathname, query: temp });
  };

  const onOpenRemoveCompanyModal = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "remove-company": true,
      },
    });
  };

  const onCloseRemoveCompanyModal = () => {
    const temp = { ...router.query };

    delete temp["remove-company"];

    router.push({ pathname: router.pathname, query: temp });
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => {
        return (
          <>
            <Slideout
              id="company-details-slideout"
              title="Company overview"
              open={!!router.query["company-details"]}
              onClose={() => onClose(form)}
              actions={[
                ...(company?.pending
                  ? [
                      {
                        id: "revoke-invitation-button",
                        text: "Revoke invitation",
                        variant: "danger",
                        onClick: onOpenRevokeInvitationModal,
                      } as ButtonProps,
                    ]
                  : [
                      {
                        id: "remove-company-button",
                        text: "Remove company",
                        variant: "danger",
                        onClick: onOpenRemoveCompanyModal,
                      } as ButtonProps,
                    ]),
                {
                  id: "save-invitation-button",
                  text: "Save",
                  variant: "primary",
                  onClick: handleSubmit,
                },
              ]}
            >
              <div id="update-worker-slideout-content" className={styles.form}>
                <div className={styles.info}>
                  <p className={styles.description}>Name:</p>

                  <p className={styles.data}>{company?.name}</p>
                </div>

                <div className={styles.info}>
                  <p className={styles.description}>Status:</p>

                  <p className={styles.data}>
                    {company?.pending ? "Pending" : "Active"}
                  </p>
                </div>

                {company?.permissions ? (
                  <div>
                    <p className={styles.description}>Permissions:</p>

                    <Field
                      name="permissions"
                      initialValue={company.permissions}
                      component={PermissionsInput}
                      noTabs
                    />
                  </div>
                ) : null}
              </div>
            </Slideout>

            <Modal
              id="revoke-invitation-modal"
              title="Revoke invitation?"
              onClose={() => onCloseRevokeInviteModal()}
              open={!!router?.query["revoke-invitation"]}
              actions={[
                {
                  text: "Revoke",
                  onClick: () => onRevokeInvitation(form),
                  variant: "danger",
                },
              ]}
            >
              <p>
                Are you sure you want to revoke <b>{company?.name}</b>'s
                invitation to <b>{project?.name}</b>?
              </p>
            </Modal>

            <Modal
              id="remove-company-modal"
              title="Remove company?"
              onClose={() => onCloseRemoveCompanyModal()}
              open={!!router?.query["remove-company"]}
              actions={[
                {
                  text: "Remove",
                  onClick: () => onRemoveCompany(form),
                  variant: "danger",
                },
              ]}
            >
              <p>
                Are you sure you want to remove <b>{company?.name}</b> from
                <b>{project?.name}</b>?
              </p>
            </Modal>
          </>
        );
      }}
    />
  );
};

export default CompanyOverviewSlideout;
