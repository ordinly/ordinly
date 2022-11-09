import { useRouter } from "next/router";

import { FileUpload } from "@components/FileUpload";

import { Field } from "@components/Field";

const FilesPage = () => {
  const router = useRouter();

  return (
    <>
      <Field
        name="files"
        component={FileUpload}
        id="update-task-file-upload"
        getHref={(fileId) =>
          `/api/company/${router.query["companyId"] as string}/projects/${
            router.query["projectId"] as string
          }/tasks/${router.query["task-id"] as string}/files/${fileId}`
        }
      />
    </>
  );
};

export default FilesPage;
