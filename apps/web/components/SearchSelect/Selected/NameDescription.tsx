import { RichTextEditor } from "@components/RichTextEditor";

import styles from "./Selected.module.css";

const NameDescription = ({ name, description }: any) => {
  return (
    <>
      <h4 className={styles.title}>{name}</h4>

      {typeof description === "string" ? (
        <p className={styles.description}>{description}</p>
      ) : (
        <RichTextEditor value={description} readOnly />
      )}
    </>
  );
};

export default NameDescription;
