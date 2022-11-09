import { Button } from "@components/Button";

import formatDate from "@util/formatDate";

import styles from "./File.module.css";

import type { FileProps } from "./types";

const FileComponent = ({ name, href, onRemove, size }: FileProps) => {
  return (
    <div className={styles.container}>
      <a className={styles.name} href={href} download={name}>
        {name}
      </a>

      <div>
        <Button
          id={`remove-file-button-${name}`}
          icon="trash"
          variant="ghost"
          htmlTitle="Remove file"
          onClick={() => onRemove()}
        />
      </div>
    </div>
  );
};

export default FileComponent;
