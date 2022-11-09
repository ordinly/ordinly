import { useRouter } from "next/router";

import { FileUpload } from "@components/FileUpload";

import { Field } from "@components/Field";

const Files = () => {
  const router = useRouter();

  return (
    <>
      <Field name="files" component={FileUpload} id="add-contact-file-upload" />
    </>
  );
};

export default Files;
