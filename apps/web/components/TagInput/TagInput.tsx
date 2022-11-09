import { useState, useEffect, useRef } from "react";

import Draft, { Editor, EditorState, ContentState } from "draft-js";
import "draft-js/dist/Draft.css";

import { Icon } from "@components/Icon";

import styles from "./TagInput.module.css";

import type { TagInputProps } from "./types";

const TagInput = ({
  value,
  onChange,
  onRemove,
  readOnly,
  error,
}: TagInputProps) => {
  const ref = useRef<HTMLDivElement>();

  const [active, setActive] = useState(!value?.value);

  const [editorState, setEditorState] = useState(() => {
    if (value?.value) {
      return EditorState.createWithContent(
        ContentState.createFromText(value.value)
      );
    }

    return EditorState.createEmpty();
  });

  const keyBindingFn = (event) => {
    if (!event.metaKey && event.code === "Enter") {
      return false;
    }

    return Draft.getDefaultKeyBinding(event);
  };

  const onChangeValue = (newValue) => {
    onChange({
      key: value.key,
      value: newValue.getCurrentContent().getPlainText(),
    });

    setEditorState(newValue);
  };

  const onClick = () => {
    if (!active && !readOnly) {
      setActive(true);
    }
  };

  useEffect(() => {
    if (readOnly === true && value.value) {
      setActive(false);
    }
  }, [readOnly]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref?.current?.contains(event.target)) {
        if (value.value) {
          setActive(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className={styles.container} onClick={onClick} ref={ref}>
      <div
        className={`${styles.input} ${active ? styles.active : ""} ${
          error ? styles.error : ""
        }`}
      >
        <Editor
          editorState={editorState}
          onChange={onChangeValue}
          spellCheck={true}
          readOnly={!active}
          keyBindingFn={keyBindingFn}
        />
      </div>

      {active ? (
        <button className={styles.remove} onClick={onRemove}>
          <Icon icon="close" size={12} />
        </button>
      ) : null}
    </div>
  );
};

export default TagInput;
