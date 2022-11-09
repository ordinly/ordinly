import { useContext, useState, useCallback } from "react";

import { useRouter } from "next/router";

import { searchUsers } from "@ordinly/api-abstraction";

import UserContext from "@contexts/UserContext";
import CompanyContext from "@contexts/CompanyContext";
import NotificationContext from "@contexts/NotificationContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { SearchSelect } from "@components/SearchSelect";
import { TextList } from "@components/TextList";

import { required, isEmail } from "@components/Form/validation";

import { revokeInvitation, updateInvitation } from "@ordinly/api-abstraction";

import AddNewWorkerWarningModal from "./AddNewWorkerWarningModal";

import styles from "./AddNewWorkerSlideout.module.css";

const AddNewWorkersSlideout = ({ onSubmit: onSubmitProp }) => {
  const { user } = useContext(UserContext);
  const { company } = useContext(CompanyContext);
  const { notification } = useContext(NotificationContext);

  const [invitations, setInvitations] = useState(null);

  const router = useRouter();

  const onClose = () => {
    const temp = { ...router.query };

    delete temp["invitations"];

    router.push({ pathname: router.pathname, query: temp });
  };

  const onSubmit = async (values) => {
    setInvitations(values);

    router.replace({
      pathname: router.pathname,
      query: { ...router.query, "add-worker-warning": true },
    });
  };

  const onRemove = async ({ invitationId }) => {
    const response = await revokeInvitation({
      invitationId,
      companyId: router.query.companyId as string,
    });

    if ("error" in response) {
      throw response;
    } else {
      notification({
        variant: "success",
        title: "Invitation revoked",
        message: "Invitation successfully revoked",
      });

      await onSubmitProp();
    }
  };

  const inputValidator = (value) => {
    const requiredError = required(value);

    if (requiredError) {
      return;
    }

    const emailError = isEmail(value);

    if (emailError) {
      return emailError;
    }

    if (company?.workers?.find(({ email }) => email === value)) {
      return "You can't invite workers already in the company";
    }

    if (
      company?.outgoingInvitations?.find(({ to: { email } }) => email === value)
    ) {
      return "This user has already been invited to the company";
    }
  };

  const onFetchWorkers = useCallback(
    async (values) => {
      return await searchUsers({
        exclude: [],
        ...values,
      });
    },
    [router.query["companyId"]]
  );

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => {
        return (
          <Slideout
            id="invitations-slideout"
            title="Invite workers"
            open={!!router.query["invitations"]}
            onClose={onClose}
            actions={[
              {
                id: "add-worker-submit-button",
                text: "Invite workers",
                onClick: handleSubmit,
                disabled:
                  !form.getFieldState("users")?.value?.length &&
                  !form.getFieldState("emails")?.value?.length,
              },
            ]}
          >
            {user ? (
              <div className={styles.new}>
                <Field
                  title="Find a user on Ordinly"
                  name="users"
                  component={SearchSelect}
                  id="new-worker-worker-select"
                  onFetchData={onFetchWorkers}
                  entity="users"
                  multi
                  exclude={[
                    user._id,
                    ...(company?.workers
                      ? company?.workers?.reduce(
                          (total, { userId }) =>
                            userId ? [...total, userId] : total,
                          []
                        )
                      : []),
                  ]}
                />

                <Field
                  title="Invite via email"
                  name="emails"
                  component={TextList}
                  id="new-worker-email-input"
                  validateEntry={(value, allValues) => {
                    const invalidEmail = isEmail(value);

                    if (invalidEmail) {
                      return invalidEmail;
                    }

                    if (allValues.includes(value)) {
                      return "You can only invite an email once";
                    }
                  }}
                />
              </div>
            ) : null}

            <AddNewWorkerWarningModal
              invitations={invitations}
              onSubmit={() => {
                onSubmitProp();
                onClose();
              }}
            />
          </Slideout>
        );
      }}
    />
  );
};

export default AddNewWorkersSlideout;
