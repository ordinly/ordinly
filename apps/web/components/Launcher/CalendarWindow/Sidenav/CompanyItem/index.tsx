import { useState, useRef } from "react";

import { Field } from "react-final-form";

import { useSpring, animated } from "@react-spring/web";

import { Checkbox } from "@components/Checkbox";
import { Icon } from "@components/Icon";

import ClientItem from "./ClientItem";

import styles from "./CompanyItem.module.css";

const CompanyItem = ({ _id: companyId, name, clients, form }) => {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  const expand = useSpring({
    config: { friction: 20 },
    height: open ? `${ref?.current?.scrollHeight}px` : "0px",
  });

  const onToggleOpen = () => {
    if (clients?.some(({ projects }) => projects?.length)) {
      setOpen(!open);
    }
  };

  return (
    <li>
      <div>
        <div className={styles.topContainer} onClick={onToggleOpen}>
          <div
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <Checkbox
              value={false}
              onChange={() =>
                form.mutators.checkAll(
                  companyId,
                  !Object.values(form.getState()?.values[companyId]).every(
                    (value) => value
                  )
                )
              }
            />
          </div>

          <div className={styles.companyName}>{name}</div>

          {clients?.length ? (
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
          {clients?.length ? (
            <>
              <h4 className={styles.title}>Clients</h4>

              {clients?.map(({ _id: clientId, name, projects }) => (
                <ClientItem
                  companyId={companyId}
                  clientId={clientId}
                  name={name}
                  projects={projects}
                />
              ))}
            </>
          ) : null}
        </animated.div>
      </div>
    </li>
  );
};

export default CompanyItem;
