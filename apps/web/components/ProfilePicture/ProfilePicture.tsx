import { useState, useRef, useEffect } from "react";

import { Icon } from "@components/Icon";

import styles from "./ProfilePicture.module.css";

import type { ProfilePictureProps } from "./types";

const ProfilePicture = ({
  variant = "company",
  _id,
  id = _id,
  size = "medium",
  onClick: onClickCallback,
  onChange,
  readOnly,
}: ProfilePictureProps) => {
  const [fileReader, setFileReader] = useState<FileReader>();

  const [backgroundImage, setBackgroundImage] = useState(null);

  const inputRef = useRef<HTMLInputElement>(undefined);

  const onClick = () => {
    if (onClickCallback) {
      onClickCallback();
    }

    if (onChange) {
      inputRef?.current?.click();
    }
  };

  const addFile = async (newFile: File) => {
    if (newFile) {
      if (fileReader) {
        fileReader.readAsDataURL(newFile);
      }
    }

    onChange(newFile);
  };

  useEffect(() => {
    (async () => {
      const fr = new FileReader();

      fr.onload = () => {
        setBackgroundImage(`url(${fr?.result.toString()})`);
      };

      setFileReader(fr);
    })();
  }, [backgroundImage]);

  useEffect(() => {
    setBackgroundImage(
      `url("http${
        process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "s" : ""
      }://${window?.location.hostname}/api/${variant}/${_id}/profile-picture")`
    );
  }, [_id]);

  return (
    <div className={styles.container}>
      <input
        type="file"
        ref={inputRef}
        title=""
        onChange={({ target: { files } }) => addFile(files[0])}
        accept="image/*"
        className={styles.input}
      />

      <div
        id={id}
        className={`${styles.imageContainer} ${styles[variant]} ${styles[size]}`}
        style={{
          backgroundImage: `${backgroundImage}, url('http://placehold.it/500x500')`,
        }}
      />

      {!readOnly && (onChange || onClickCallback) ? (
        <div
          onClick={onClick}
          className={`${styles.overlay} ${styles[variant]}`}
        >
          {onChange ? <Icon icon="upload" size={40} /> : null}
        </div>
      ) : null}
    </div>
  );
};

export default ProfilePicture;
