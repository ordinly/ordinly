import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import {
  revokeInvitationToCompanyProject,
  updateInvitationToCompanyProject,
  removeCompanyFromCompanyProject,
  updateCompanyPermissionsOnCompanyProject,
  getCompanyProjectCompany,
} from "@ordinly/api-abstraction/companies";

import ProjectContext from "@contexts/ProjectContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { PermissionsInput } from "@components/PermissionsInput";
import { Modal } from "@components/Modal";

import styles from "./CompanyOverviewSlideout.module.css";

import type { ButtonProps, ButtonVariants } from "@components/Button";

const CompanyOverviewSlideout = ({ onSubmit: onSubmitCallback }) => {
  const { project, fetchProject } = useContext(ProjectContext);

  const router = useRouter();

  const [invited, setInvited] = useState<any>();

  useEffect(() => {
    if (router.query["company-id"]) {
      (async () => {
        const { company: fetchedCompany } = await getCompanyProjectCompany({
          projectCompanyId: router.query["company-id"] as string,
          companyId: router.query["companyId"] as string,
          projectId: router.query["projectId"] as string,
        });

        setInvited(fetchedCompany);
      })();
    }
  }, [router.query["company-id"]]);

  const onRemoveCompany = async (form) => {
    await removeCompanyFromCompanyProject({
      projectId: project?._id,
      companyId: router.query["companyId"] as string,
      invitedCompanyId: invited?._id,
    });

    await fetchProject();

    onClose(form);

    onSubmitCallback();
  };

  const onRevokeInvitation = async (form) => {
    await revokeInvitationToCompanyProject({
      projectId: project?._id,
      companyId: router.query["companyId"] as string,
      invitationId: invited?.invitationId,
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
    delete temp["company-id"];

    if (form) {
      form.restart();
    }

    router.push({ pathname: router.pathname, query: temp });
  };

  const onSubmit = async (values, form) => {
    if (invited?.pending) {
      await updateInvitationToCompanyProject({
        invitationId: invited?.invitationId,
        projectId: project?._id,
        companyId: router.query["companyId"] as string,
        ...values,
      });
    } else {
      await updateCompanyPermissionsOnCompanyProject({
        invitation: invited?._id,
        companyId: router.query["companyId"] as string,
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
                ...(invited?.canRemove
                  ? [
                      ...(invited?.pending
                        ? [
                            {
                              id: "revoke-invitation-button",
                              text: "Revoke invitation",
                              variant: "danger" as ButtonVariants,
                              onClick: onOpenRevokeInvitationModal,
                            } as ButtonProps,
                          ]
                        : [
                            {
                              id: "remove-company-button",
                              text: "Remove company",
                              variant: "danger" as ButtonVariants,
                              onClick: onOpenRemoveCompanyModal,
                            } as ButtonProps,
                          ]),
                    ]
                  : []),
                ...(invited?.canEdit
                  ? [
                      {
                        id: "save-invitation-button",
                        text: "Save",
                        variant: "primary",
                        onClick: handleSubmit,
                      } as ButtonProps,
                    ]
                  : []),
              ]}
            >
              <div id="update-worker-slideout-content" className={styles.form}>
                <div className={styles.info}>
                  <p className={styles.description}>Name:</p>

                  <p className={styles.data}>{invited?.name}</p>
                </div>

                <div className={styles.info}>
                  <p className={styles.description}>Status:</p>

                  <p className={styles.data}>
                    {invited?.pending ? "Pending" : "Active"}
                  </p>
                </div>

                {invited?.permissions ? (
                  <div>
                    <p className={styles.description}>Permissions:</p>

                    <Field
                      name="permissions"
                      initialValue={invited.permissions}
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
                Are you sure you want to revoke <b>{invited?.name}</b>'s
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
                Are you sure you want to remove <b>{invited?.name}</b> from
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
