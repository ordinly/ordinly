import { useContext, useCallback } from "react";

import { useRouter } from "next/router";

import { getCompanyWorkers } from "@ordinly/api-abstraction";

import CompanyContext from "@contexts/CompanyContext";
import NotificationContext from "@contexts/NotificationContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { SearchSelect } from "@components/SearchSelect";

import { required } from "@components/Form/validation";

import { createTeam } from "@ordinly/api-abstraction";

import styles from "./AddNewTeamSlideout.module.css";

const AddNewTeamSlideout = ({ onSubmit: onSubmitProp }) => {
  const { company } = useContext(CompanyContext);
  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  const onClose = (form) => {
    const temp = { ...router.query };

    delete temp["add-new-team"];

    router.push({ pathname: router.pathname, query: temp });

    form.restart();
  };

  const onSubmit = async (values, form) => {
    try {
      await createTeam({ ...values, companyId: company._id });
      await onSubmitProp();

      onClose(form);
    } catch (caught) {
      const { error = "There was an error adding this team" } = caught;

      notification({
        variant: "error",
        title: "Error adding team",
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

  return (
    <Form
      initialValues={{ members: [] }}
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => {
        return (
          <Slideout
            id="add-new-team-slideout"
            title="Add new team"
            open={!!router.query["add-new-team"]}
            onClose={() => onClose(form)}
            dirty={form.getState().dirty}
            actions={[
              {
                id: "add-team-submit-button",
                text: "Add Team",
                onClick: async () => {
                  await handleSubmit();
                },
                icon: "add",
                type: "submit",
              },
            ]}
          >
            <div className={styles.new}>
              <div id="add-new-team-slideout-form">
                <Field
                  title="Name"
                  name="name"
                  required
                  component={Input}
                  id="new-team-name-input"
                />

                <Field
                  title="Description"
                  name="description"
                  component={TextArea}
                  id="new-team-description-textarea"
                />

                <Field
                  title="Members"
                  name="members"
                  component={SearchSelect}
                  id="new-team-worker-select"
                  onFetchData={onFetchWorkers}
                  entity="workers"
                  multi
                />
              </div>
            </div>
          </Slideout>
        );
      }}
    />
  );
};

export default AddNewTeamSlideout;
