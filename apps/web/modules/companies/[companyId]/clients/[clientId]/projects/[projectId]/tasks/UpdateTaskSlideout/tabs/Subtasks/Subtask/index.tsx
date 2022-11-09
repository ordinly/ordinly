import { useContext, useState, useRef } from "react";

import { useSpring, animated } from "@react-spring/web";

import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { Checkbox } from "@components/Checkbox";
import { Select } from "@components/Select";
import { Button } from "@components/Button";
import { Icon } from "@components/Icon";

import CompanyContext from "@contexts/CompanyContext";

import { required } from "@components/Form/validation";

import styles from "./Subtask.module.css";

const Subtask = ({ name, onRemoveSubtask }) => {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  const expand = useSpring({
    config: { friction: 20 },
    height: open ? `${ref?.current?.scrollHeight}px` : "0px",
  });

  const { company } = useContext(CompanyContext);

  const onToggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.tileContainer}>
      <div className={styles.topContainer}>
        <div className={styles.checkboxField}>
          <Field
            inline
            hideErrorMessage
            name={`${name}.complete`}
            component={Checkbox}
            id="new-subtask-item-complete-checkbox"
          />
        </div>

        <div className={styles.nameField}>
          <Field
            inline
            hideErrorMessage
            name={`${name}.name`}
            component={Input}
            validate={required}
            id="new-subtask-item-name-input"
          />
        </div>

        <div
          className={`${styles.caret} ${open ? styles.open : ""}`}
          onClick={onToggleOpen}
        >
          <Icon icon="caret-down" />
        </div>
      </div>

      <animated.div
        style={expand}
        ref={ref}
        className={`${styles.bottomContainer} ${open ? styles.open : ""}`}
      >
        <Field
          title="Assignee"
          name={`${name}.assignee`}
          component={Select}
          id={`${name}-assignee-select`}
          options={company?.workers.map(({ _id, name }) => ({
            value: _id,
            label: name,
          }))}
        />

        <Field
          title="Start date"
          hideErrorMessage
          name={`${name}.startDate`}
          htmlType="date"
          component={Input}
          id="new-subtask-item-start-date-input"
        />

        <Field
          title="Due date"
          hideErrorMessage
          name={`${name}.dueDate`}
          htmlType="date"
          component={Input}
          id="new-subtask-item-due-date-input"
        />

        <div className={styles.button}>
          <Button
            id="remove-new-subtask-item-button"
            text="Remove subtask"
            icon="trash"
            onClick={onRemoveSubtask}
            variant="danger"
          />
        </div>
      </animated.div>
    </div>
  );
};

export default Subtask;
