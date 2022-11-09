import React, { useCallback, useContext, useState } from "react";

import { FormSpy } from "react-final-form";

import { debounce } from "lodash";

import NotificationContext from "@contexts/NotificationContext";

const AutoSave = ({ onSave }) => {
  const { notification } = useContext(NotificationContext);

  const [waiting, setWaiting] = useState(false);

  const debouncedSubmit = useCallback(
    debounce(async (values) => {
      if (onSave && !waiting) {
        try {
          setWaiting(true);
          await onSave(values);
        } catch (error) {
          const {
            error: errorMessage = "There was an error submitting this form",
          } = error;

          notification({
            variant: "error",
            title: "Error",
            message: errorMessage,
          });
        }
        setWaiting(false);
      }
    }, 500),
    []
  );

  return (
    <FormSpy
      subscription={{ valid: true, values: true }}
      onChange={({ valid, values }) => {
        if (valid) {
          debouncedSubmit(values);
        }
      }}
    />
  );
};

export default AutoSave;
