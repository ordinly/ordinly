import { useContext } from "react";

import { useRouter } from "next/router";

import { Modal } from "@components/Modal";

import { deleteUserProject } from "@ordinly/api-abstraction/users";

import ProjectContext from "@contexts/ProjectContext";
import NotificationContext from "@contexts/NotificationContext";

import styles from "./DeleteProjectModal.module.css";

const DeleteProjectModal = ({ onClose }) => {
  const { notification } = useContext(NotificationContext);
  const { project } = useContext(ProjectContext);

  const router = useRouter();

  const onSubmit = async () => {
    try {
      await deleteUserProject({
        projectId: project?._id,
      });

      onCloseDeleteProjectModal();

      onClose();

      router.replace({
        pathname: `/my-work/personal/projects`,
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
      title="Remove project?"
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
