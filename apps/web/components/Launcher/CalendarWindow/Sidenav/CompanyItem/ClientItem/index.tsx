import { useState, useRef } from "react";

import { Field } from "react-final-form";

import { useSpring, animated } from "@react-spring/web";

import { Checkbox } from "@components/Checkbox";
import { Icon } from "@components/Icon";

import styles from "./ClientItem.module.css";

const ClientItem = ({ companyId, clientId, name, projects }) => {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  const expand = useSpring({
    config: { friction: 20 },
    height: open ? `${ref?.current?.scrollHeight}px` : "0px",
  });

  const onToggleOpen = () => {
    if (projects?.length) {
      setOpen(!open);
    }
  };

  return (
    <li className={styles.project} onClick={onToggleOpen}>
      <div>
        <div className={styles.topContainer} onClick={onToggleOpen}>
          <Field
            name={`${companyId}.${clientId}`}
            type="checkbox"
            render={({ input: { onChange, checked } }) => {
              return <Checkbox value={checked} onChange={onChange} />;
            }}
          />
          <div className={styles.projectName}>{name}</div>

          {projects?.length ? (
            <div
              className={`${styles.caret} ${open ? styles.open : ""}`}
              onClick={onToggleOpen}
            >
              <Icon icon="caret-down" />
            </div>
          ) : null}
        </div>

        <animated.div
          style={{ ...expand }}
          ref={ref}
          className={`${styles.bottomContainer} ${open ? styles.open : ""}`}
        >
          {projects?.length ? (
            <>
              <h4 className={styles.title}>Projects</h4>
            </>
          ) : null}
        </animated.div>
      </div>
    </li>
  );
};

export default ClientItem;
