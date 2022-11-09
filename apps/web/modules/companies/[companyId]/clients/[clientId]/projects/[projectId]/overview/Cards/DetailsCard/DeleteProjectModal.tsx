import { useContext } from "react";

import { useRouter } from "next/router";

import { Button } from "@components/Button";
import { Modal } from "@components/Modal";

import { deleteProject } from "@ordinly/api-abstraction";

import CompanyContext from "@contexts/CompanyContext";
import ProjectContext from "@contexts/ProjectContext";
import NotificationContext from "@contexts/NotificationContext";

import styles from "./DeleteProjectModal.module.css";

const DeleteProjectModal = () => {
  const { notification } = useContext(NotificationContext);
  const { company, fetchCompany } = useContext(CompanyContext);
  const { project } = useContext(ProjectContext);

  const router = useRouter();

  const onSubmit = async () => {
    try {
      await deleteProject({
        companyId: company?._id,
        clientId: router.query["clientId"] as string,
        projectId: project?._id,
      });

      await fetchCompany();

      router.replace({
        pathname: `/companies/[companyId]/clients/[clientId]/projects`,
        query: router.query,
      });
    } catch (caught) {
      console.error(caught);
      const { error = "There was an error deleting this project" } = caught;

      notification({
        variant: "error",
        title: "Error deleting project",
        message: error,
      });
    }
  };

  const onCloseDeleteProjectModal = () => {
    const temp = router.query;

    delete temp["delete-project"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  return (
    <Modal
      id="delete-project-modal"
      title="Delete project?"
      onClose={onCloseDeleteProjectModal}
      open={!!router?.query["delete-project"]}
      actions={[
        {
          text: "Remove project",
          variant: "danger",
          onClick: onSubmit,
        },
      ]}
    >
      <p className={styles.modalText}>
        Are you sure you want to delete{" "}
        <span className={styles.bold}>{project?.name}</span>?
      </p>
    </Modal>
  );
};

export default DeleteProjectModal;
