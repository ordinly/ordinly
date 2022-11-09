import { useContext } from "react";

import { useRouter } from "next/router";

import ProjectContext from "@contexts/ProjectContext";

import { FileUpload } from "@components/FileUpload";

import {
  addFileToTask,
  removeFileFromTask,
} from "@ordinly/api-abstraction/companies";

import styles from "./FilesPage.module.css";

const FilesPage = ({ task }) => {
  const { fetchProject } = useContext(ProjectContext);

  const router = useRouter();

  const onAddFile = async ({ file }) => {
    await addFileToTask({
      companyId: router.query["companyId"] as string,
      clientId: router.query["clientId"] as string,
      projectId: router.query["projectId"] as string,
      taskId: task._id,
      file,
    });

    await fetchProject();
  };

  const onRemoveFile = async ({ _id }) => {
    await removeFileFromTask({
      companyId: router.query["companyId"] as string,
      clientId: router.query["clientId"] as string,
      projectId: router.query["projectId"] as string,
      taskId: task._id,
      fileId: _id,
    });

    await fetchProject();
  };

  return (
    <>
      <div className={styles.fileUpload}>
        <FileUpload
          value={task?.files}
          id="update-task-file-upload"
          onUpload={onAddFile}
          onRemove={onRemoveFile}
          getHref={(fileId) =>
            `/api/company/${router.query["companyId"] as string}/projects/${
              router.query["projectId"] as string
            }/tasks/${task._id}/files/${fileId}`
          }
        />
      </div>
    </>
  );
};

export default FilesPage;
