import { FileUpload } from "@components/FileUpload";

import { Field } from "@components/Field";

const Files = ({ disabled }: { disabled?: boolean }) => {
  return (
    <>
      <Field
        name="files"
        component={FileUpload}
        id="add-contact-file-upload"
        disabled={disabled}
      />
    </>
  );
};

export default Files;
