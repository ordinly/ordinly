import { useContext, useEffect, useState, useCallback } from "react";

import { useRouter } from "next/router";

import { getCompanyWorkers } from "@ordinly/api-abstraction/companies";

import CompanyContext from "@contexts/CompanyContext";
import UserContext from "@contexts/UserContext";
import NotificationContext from "@contexts/NotificationContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Modal } from "@components/Modal";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { SearchSelect } from "@components/SearchSelect";

import {
  updateTeam,
  removeTeam,
  getCompanyTeam,
} from "@ordinly/api-abstraction/companies";

import styles from "./UpdateTeamSlideout.module.css";

import type { ButtonProps } from "@components/Button";

const UpdateTeamSlideout = ({ onSubmit: onSubmitProp }) => {
  const { notification } = useContext(NotificationContext);
  const { company } = useContext(CompanyContext);
  const { user } = useContext(UserContext);

  const [team, setTeam] = useState<any>();
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.query["team-id"]) {
      (async () => {
        const { team: fetchedTeam } = await getCompanyTeam({
          teamId: router.query["team-id"],
          companyId: router.query["companyId"],
        });

        setTeam(fetchedTeam);
      })();
    }
  }, [router.query["team-id"]]);

  const onClose = () => {
    const temp = { ...router.query };

    delete temp["update-team"];
    delete temp["team-id"];
    delete temp["remove-team-modal"];

    onCloseRemoveTeamModal();

    router.push({ pathname: router.pathname, query: temp });
  };

  const onSave = async (values) => {
    try {
      setSaving(true);

      await updateTeam({
        ...values,
        companyId: company._id,
        teamId: team?._id,
      });

      await onSubmitProp();

      onClose();
    } catch (caught) {
      const { error = "There was an error updating this team" } = caught;

      notification({
        variant: "error",
        title: "Error updating team",
        message: error,
      });
    }

    setSaving(false);
  };

  const onOpenRemoveTeamModal = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "remove-team-modal": true,
      },
    });
  };

  const onCloseRemoveTeamModal = () => {
    const temp = { ...router.query };

    delete temp["remove-team-modal"];

    router.push({ pathname: router.pathname, query: temp });
  };

  const onRemoveTeam = async () => {
    try {
      await removeTeam({ companyId: company._id, teamId: team._id });

      onSubmitProp();

      onClose();
    } catch (caught) {
      const { error = "There was an error removing this team" } = caught;

      notification({
        variant: "error",
        title: "Error removing team",
        message: error,
      });
    }
  };

  const onFetchWorkers = useCallback(
    async (values) => {
      return await getCompanyWorkers({
        companyId: router.query["companyId"],
        ...values,
      });
    },
    [router.query["companyId"]]
  );

  console.log(
    "TEAM",
    user?._id,
    team?.members,
    team?.members?.includes(user?._id)
  );

  return (
    <Form
      onSubmit={onSave}
      render={({ handleSubmit, form }) => {
        return (
          <Slideout
            id="update-team-slideout"
            title="Update team"
            open={!!router.query["update-team"]}
            onClose={onClose}
            saving={saving}
            dirty={form.getState().dirty}
            actions={[
              ...(team?.canRemove
                ? [
                    {
                      id: "remove-team-button",
                      onClick: onOpenRemoveTeamModal,
                      text: "Remove team",
                      variant: "danger",
                    } as ButtonProps,
                  ]
                : []),
              ...(team?.canEdit
                ? [
                    {
                      text: "Save",
                      onClick: handleSubmit,
                      type: "submit",
                    } as ButtonProps,
                  ]
                : []),
            ]}
          >
            <>
              {team ? (
                <div id="update-team-slideout-form">
                  <Field
                    title="Name"
                    name="name"
                    component={Input}
                    required
                    initialValue={team?.name}
                    id="update-team-name-input"
                    readOnly={!team?.canEdit}
                  />

                  <Field
                    title="Description"
                    name="description"
                    component={TextArea}
                    initialValue={team?.description}
                    id="update-team-description-textarea"
                    readOnly={!team?.canEdit}
                  />

                  <Field
                    title="Members"
                    name="members"
                    required
                    component={SearchSelect}
                    id="new-team-worker-select"
                    onFetchData={onFetchWorkers}
                    entity="workers"
                    multi
                    initialValue={team?.members}
                  />
                </div>
              ) : null}

              <Modal
                id="remove-team-modal"
                title="Remove team?"
                onClose={onCloseRemoveTeamModal}
                open={!!router?.query["remove-team-modal"]}
                actions={[
                  {
                    text: "Remove team",
                    onClick: onRemoveTeam,
                    variant: "danger",
                  },
                ]}
              >
                <p className={styles.modalText}>
                  Are you sure you want to remove{" "}
                  <span className={styles.bold}>{team?.name}</span>?
                </p>
              </Modal>
            </>
          </Slideout>
        );
      }}
    />
  );
};

export default UpdateTeamSlideout;
