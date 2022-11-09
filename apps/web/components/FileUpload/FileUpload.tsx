import { useRef } from "react";

import { Icon } from "@components/Icon";

import FileComponent from "./File";

import styles from "./FileUpload.module.css";

import type { FileUploadProps } from "./types";

const FileUpload = ({
  id,
  onChange,
  value,
  multi = false,
  onRemove,
  getHref,
  disabled,
  ...rest
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(undefined);

  const onDrop = async (event) => {
    event.preventDefault();

    if (event.dataTransfer.items) {
      const newFiles = [];

      for (var i = 0; i < event.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (event.dataTransfer.items[i].kind === "file") {
          newFiles.push(event.dataTransfer.items[i].getAsFile());
        }
      }

      await onChange([...value, ...newFiles]);
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onUpload = ({ target: { files } }) => {
    onChange([...value, ...files]);
  };

  return (
    <>
      <input
        id={id}
        type="file"
        ref={inputRef}
        title=""
        onChange={onUpload}
        accept="image/*"
        className={styles.input}
      />

      <div
        className={`${styles.upload} ${styles.disabled}`}
        onClick={!disabled ? () => inputRef?.current?.click() : undefined}
        onDrop={onDrop}
        onDragOver={!disabled ? onDragOver : undefined}
      >
        <Icon icon="upload" />

        <p className={styles.text}>Drop files here or click to browse</p>
      </div>

      {value &&
        value.map(({ _id, name, size }, index) => (
          <>
            <FileComponent
              name={name}
              onRemove={() =>
                onChange(value.filter((file, location) => location !== index))
              }
              size={size}
              href={_id && getHref ? getHref(_id) : undefined}
            />
          </>
        ))}
    </>
  );
};

export default FileUpload;
