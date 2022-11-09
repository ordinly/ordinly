import { useEffect, useState } from "react";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import styles from "./TextList.module.css";

import { TextListProps } from "./types";

const TextList = ({ onChange, value = [], validateEntry }: TextListProps) => {
  const [newEntry, setNewEntry] = useState("");

  const validate = () => {
    if (!newEntry) {
      return "Can't add an empty item";
    }

    if (validateEntry) {
      return validateEntry(newEntry, value);
    }
  };

  useEffect(() => {
    if (!Array.isArray(value)) {
      onChange([]);
    }
  }, [value]);

  return (
    <>
      <div className={styles.input}>
        <Input value={newEntry} onChange={setNewEntry} />

        <div>
          <Button
            icon="add"
            onClick={() => {
              onChange([...value, newEntry]);
              setNewEntry("");
            }}
            htmlTitle={validate()}
            disabled={validate()}
          />
        </div>
      </div>

      <div className={styles.entries}>
        {Array.isArray(value) &&
          value?.map((entry, index) => (
            <div className={styles.entry}>
              <p className={styles.text}>{entry}</p>

              <div>
                <Button
                  icon="close"
                  variant="ghost"
                  danger
                  onClick={() => {
                    onChange(
                      value.filter((entry, entryIndex) => index !== entryIndex)
                    );
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default TextList;
