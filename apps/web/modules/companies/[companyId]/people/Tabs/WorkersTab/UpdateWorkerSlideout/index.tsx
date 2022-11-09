import { useContext, useState, useCallback, useEffect } from "react";

import { useRouter } from "next/router";

import CompanyContext from "@contexts/CompanyContext";
import NotificationContext from "@contexts/NotificationContext";
import UserContext from "@contexts/UserContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Select } from "@components/Select";
import { SearchSelect } from "@components/SearchSelect";
import { Button } from "@components/Button";

import formatDate from "@util/formatDate";

import {
  updateWorker,
  getCompanyRoles,
  getCompanyWorker,
} from "@ordinly/api-abstraction/companies";

import LeaveCompanyModal from "./LeaveCompanyModal";
import RemoveWorkerModal from "./RemoveWorkerModal";
import OwnerCannotLeaveCompanyWarningModal from "./OwnerCannotLeaveCompanyWarningModal";

import styles from "./UpdateWorkerSlideout.module.css";

import type { ButtonVariants, ButtonProps } from "@components/Button";

const statuses = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const UpdateWorkersSlideout = ({ onSubmit: onSubmitProp }) => {
  const { notification } = useContext(NotificationContext);
  const { company } = useContext(CompanyContext);

  const { user } = useContext(UserContext);

  const [worker, setWorker] = useState<any>();
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.query["worker-id"]) {
      (async () => {
        const { worker: fetchedWorker } = await getCompanyWorker({
          workerId: router.query["worker-id"] as string,
          companyId: router.query["companyId"] as string,
        });

        setWorker(fetchedWorker);
      })();
    }
  }, [router.query["worker-id"]]);

  const fetchRoles = useCallback(
    async () =>
      getCompanyRoles({
        companyId: router.query["companyId"],
      }),
    [router.query["companyId"]]
  );

  const onClose = () => {
    const temp = { ...router.query };

    delete temp["update-worker"];
    delete temp["worker-id"];
    delete temp["remove-worker-modal"];

    router.push({ pathname: router.pathname, query: temp });
  };

  const onSave = async (values) => {
    try {
      if (worker?.canEdit) {
        const { role, status } = values;

        setSaving(true);

        if (company && worker) {
          await updateWorker({
            companyId: company?._id,
            workerId: worker?._id,
            role,
            status,
          });

          await onSubmitProp();
        }

        setSaving(false);
      }
    } catch (caught) {
      const { error = "There was an error updating this worker" } =
        caught || {};

      notification({
        variant: "error",
        title: "Error updating this worker",
        message: error,
      });
    }
  };

  const onOpenRemoveWorkerModal = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "remove-worker-modal": true,
      },
    });
  };

  const onOpenLeaveCompanyModal = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "leave-company-modal": true,
      },
    });
  };

  const onOpenOwnerLeavingCompanyWarningModal = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "owner-leaving-company": true,
      },
    });
  };

  return (
    <Form
      onSubmit={onSave}
      render={({ handleSubmit, form }) => {
        return (
          <>
            <Slideout
              id="update-worker-slideout"
              title="Worker details"
              open={!!router.query["update-worker"]}
              onClose={onClose}
              saving={saving}
              dirty={form.getState().dirty}
              actions={[
                ...(company?.owner !== worker?.userId && worker?.canEdit
                  ? [
                      {
                        text: "Remove worker",
                        variant: "danger" as ButtonVariants,
                        onClick: onOpenRemoveWorkerModal,
                      } as ButtonProps,
                    ]
                  : []),
                ...(company?.owner !== worker?.userId && worker?.canEdit
                  ? [
                      {
                        text: "Save",
                        onClick: handleSubmit,
                        type: "submit",
                      } as ButtonProps,
                    ]
                  : []),
                ,
              ]}
            >
              <>
                <div
                  id="update-worker-slideout-content"
                  className={styles.form}
                >
                  {worker?.name ? (
                    <div className={styles.info}>
                      <p className={styles.description}>Name:</p>
                      <p className={styles.data}>{worker?.name}</p>
                    </div>
                  ) : null}

                  <div className={styles.info}>
                    <p className={styles.description}>Joined:</p>
                    <p className={styles.data}>
                      {worker?.joined ? formatDate(worker?.joined) : ""}
                    </p>
                  </div>

                  <div className={styles.info}>
                    <p className={styles.description}>Email:</p>
                    <p className={styles.data}>{worker?.email}</p>
                  </div>

                  {worker?.phone ? (
                    <div className={styles.info}>
                      <p className={styles.description}>Phone:</p>
                      <p className={styles.data}>{worker?.phone}</p>
                    </div>
                  ) : null}

                  <div id={`update-worker-slideout-updatable`}>
                    <div className={styles.info}>
                      <p className={styles.description}>Role:</p>
                      {worker?.userId === company?.owner ? (
                        <p className={styles.data}>Owner</p>
                      ) : (
                        <Field
                          id="update-worker-slideout-role-select"
                          name="role"
                          inline
                          component={SearchSelect}
                          onFetchData={fetchRoles}
                          entity="roles"
                          initialValue={worker?.roleId}
                          disabled={!worker?.canEdit}
                        />
                      )}
                    </div>

                    <div className={styles.info}>
                      <p className={styles.description}>Status:</p>
                      {worker?.userId === company?.owner ? (
                        <p className={styles.data}>Active</p>
                      ) : (
                        <div>
                          {worker?.status === "pending" ? (
                            <p className={styles.data}>Pending</p>
                          ) : (
                            <Field
                              id="update-worker-slideout-status-select"
                              name="status"
                              inline
                              component={Select}
                              options={statuses}
                              initialValue={worker?.status}
                              disabled={!worker?.canEdit}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {worker?.userId === user?._id ? (
                  <Button
                    id="leave-company-button"
                    onClick={
                      company?.owner === user?._id
                        ? onOpenOwnerLeavingCompanyWarningModal
                        : onOpenLeaveCompanyModal
                    }
                    text="Leave company"
                    variant="danger"
                  />
                ) : null}

                <RemoveWorkerModal
                  worker={worker}
                  onSubmit={() => {
                    onSubmitProp();
                    onClose();
                  }}
                />

                <LeaveCompanyModal />

                <OwnerCannotLeaveCompanyWarningModal />
              </>
            </Slideout>
          </>
        );
      }}
    />
  );
};

export default UpdateWorkersSlideout;
