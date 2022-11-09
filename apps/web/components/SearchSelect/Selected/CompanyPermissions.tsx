import { useEffect, useState } from "react";

import { getCompanyProjectMinimumPermissions } from "@ordinly/api-abstraction/companies";

import { ProfilePicture } from "@components/ProfilePicture";
import { PermissionsInput } from "@components/PermissionsInput";

import styles from "./Selected.module.css";

const CompanyPermissions = ({ companyId, name, onChange }) => {
  const [permissions, setPermissions] = useState();

  useEffect(() => {
    (async () => {
      const { permissions: newPermissions } =
        await getCompanyProjectMinimumPermissions();

      setPermissions(newPermissions);
    })();
  }, []);

  const onChangePermissions = (newPermissions) => {
    setPermissions(newPermissions);
  };

  useEffect(() => {
    onChange({ companyId, permissions });
  }, [permissions]);

  return (
    <div>
      <div className={styles.company}>
        <ProfilePicture _id={companyId} size="small" />

        <h4 className={styles.title}>{name}</h4>
      </div>

      <div className={styles.flexShrink}>
        {permissions ? (
          <PermissionsInput
            value={permissions}
            onChange={onChangePermissions}
            noTabs
          />
        ) : null}
      </div>
    </div>
  );
};

export default CompanyPermissions;
