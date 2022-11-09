import { useState, useRef, useEffect } from "react";

import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

import StyleButton from "./StyleButton";

import styles from "./RichTextEditor.module.css";

import type { RichTextEditorProps } from "./types";

const RichTextEditor = ({
  readOnly = false,
  value,
  onChange,
  placeholder,
  fixed,
  transparent,
  disabled,
}: RichTextEditorProps) => {
  const editorRef = useRef();

  const [editorState, setEditorState] = useState(() => {
    if (value) {
      return EditorState.createWithContent(convertFromRaw(value));
    }

    return EditorState.createEmpty();
  });

  useEffect(() => {
    if (onChange) {
      onChange(convertToRaw(editorState.getCurrentContent()));
    }
  }, [editorState]);

  useEffect(() => {
    if (!value) {
      setEditorState(EditorState.createEmpty());
    } else {
      if (
        !convertFromRaw(value)
          .getBlockMap()
          .equals(editorState.getCurrentContent().getBlockMap())
      ) {
        setEditorState(EditorState.createWithContent(convertFromRaw(value)));
      }
    }
  }, [value]);

  const toggleBlockType = (style) => {
    setEditorState(RichUtils.toggleBlockType(editorState, style));
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const onKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);

      return "handled";
    }

    return "not-handled";
  };

  const onTab = (event) => {
    setEditorState(RichUtils.onTab(event, editorState, 4));
  };

  const styleMap = {
    STRIKETHROUGH: {
      textDecoration: "line-through",
    },
  };

  const actions = [
    {
      icon: "bold",
      style: "BOLD",
      variant: "inline",
    },
    {
      icon: "italic",
      style: "ITALIC",
      variant: "inline",
    },
    {
      icon: "underline",
      style: "UNDERLINE",
      variant: "inline",
    },
    {
      icon: "strikethrough",
      style: "STRIKETHROUGH",
      variant: "inline",
    },
    {
      icon: "ordered-list",
      style: "ordered-list-item",
      variant: "block",
    },
    {
      icon: "unordered-list",
      style: "unordered-list-item",
      variant: "block",
    },
  ];

  return (
    <div className={styles.container}>
      <div
        className={`${styles.editor} ${readOnly ? styles.readOnly : ""} ${
          fixed ? styles.fixed : ""
        } ${transparent ? styles.transparent : ""} ${
          disabled ? styles.disabled : ""
        }`}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={onKeyCommand}
          customStyleMap={styleMap}
          onTab={onTab}
          spellCheck={true}
          ref={editorRef}
          readOnly={disabled || readOnly}
          placeholder={!readOnly && placeholder}
        />
      </div>

      {!readOnly ? (
        <div className={styles.actions}>
          {actions.map(({ icon, style, variant }) => (
            <StyleButton
              icon={icon}
              active={
                variant === "inline"
                  ? editorState.getCurrentInlineStyle().has(style)
                  : editorState
                      .getCurrentContent()
                      .getBlockForKey(editorState.getSelection().getStartKey())
                      .getType() === style
              }
              onClick={(event) => {
                event.preventDefault();

                if (variant === "inline") {
                  toggleInlineStyle(style);
                } else if (variant === "block") {
                  toggleBlockType(style);
                }
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default RichTextEditor;
