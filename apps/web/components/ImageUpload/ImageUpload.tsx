import { useState, useRef, useEffect } from "react";

import styles from "./ImageUpload.module.css";

import type { ImageUploadProps } from "./types";

const ImageUpload = ({
  id,
  onChange,
  src,
  variant = "square",
}: ImageUploadProps) => {
  const [fileReader, setFileReader] = useState<FileReader>();
  const [source, setSource] = useState<string>();

  const inputRef = useRef<HTMLInputElement>(undefined);

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
        setSource(fr?.result.toString());
      };

      setFileReader(fr);
    })();
  }, [src]);

  return (
    <div>
      <input
        id={id}
        type="file"
        ref={inputRef}
        title=""
        onChange={({ target: { files } }) => addFile(files[0])}
        accept="image/*"
        className={styles.input}
      />

      <div
        className={`${styles.container} ${
          variant === "round" ? styles.round : ""
        }`}
        onClick={() => inputRef?.current?.click()}
        style={{
          backgroundImage: `url(${
            source ||
            `"http${
              process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "s" : ""
            }://${window.location.hostname}${src}`
          }`,
        }}
      />
    </div>
  );
};

export default ImageUpload;
