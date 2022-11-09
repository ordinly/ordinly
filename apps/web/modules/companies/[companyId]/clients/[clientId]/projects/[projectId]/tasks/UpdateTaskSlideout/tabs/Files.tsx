import { useRouter } from "next/router";

import { FileUpload } from "@components/FileUpload";

import { Field } from "@components/Field";

const Files = () => {
  const router = useRouter();

  return (
    <>
      <Field
        title="Files"
        name="files"
        component={FileUpload}
        id="update-task-file-upload"
        getHref={(fileId) =>
          `/api/company/${router.query["companyId"] as string}/clients/${
            router.query["clientId"] as string
          }/projects/${router.query["projectId"] as string}/tasks/${
            router.query["task-id"] as string
          }/files/${fileId}`
        }
      />
    </>
  );
};

export default Files;
