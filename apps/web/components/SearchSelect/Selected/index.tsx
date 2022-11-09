import { Button } from "@components/Button";

import Company from "./Company";
import NameDescription from "./NameDescription";
import User from "./User";
import CompanyPermissions from "./CompanyPermissions";

import styles from "./Selected.module.css";

const Selected = ({ entity, disabled, onRemove, value, ...restProps }) => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        {entity === "companies" ? <Company _id={value} {...restProps} /> : null}

        {entity === "companies:project" ? (
          <CompanyPermissions {...value} {...restProps} />
        ) : null}

        {["clients", "roles", "teams"].includes(entity) ? (
          <NameDescription _id={value} {...restProps} />
        ) : null}

        {["users", "workers"].includes(entity) ? (
          <User
            {...restProps}
            _id={entity === "workers" ? restProps.userId : value}
          />
        ) : null}
      </div>

      {!disabled ? (
        <div className={styles.actions}>
          <Button
            variant="ghost"
            danger
            icon="close"
            onClick={() => {
              onRemove(value);
            }}
            iconSize={20}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Selected;
