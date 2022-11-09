import { RichTextEditor } from "@components/RichTextEditor";

import styles from "./Info.module.css";

import { InfoItem } from "./types";

const Info = ({ data }: { data: InfoItem }) => {
  return (
    <div className={styles.container}>
      {data ? (
        <>
          {Object.entries(data).map(([key, value]: [string, any]) => (
            <>
              {typeof value === "string" ? (
                <div className={styles.info}>
                  <p className={`${styles.text} ${styles.bold}`}>{key}</p>
                  <p className={styles.text}>{value}</p>
                </div>
              ) : value?.value && value?.component === "RichTextEditor" ? (
                <div className={styles.info}>
                  <p className={`${styles.text} ${styles.bold}`}>{key}</p>
                  <RichTextEditor value={value?.value} readOnly />
                </div>
              ) : null}
            </>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default Info;
