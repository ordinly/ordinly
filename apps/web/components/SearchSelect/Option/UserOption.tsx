import { ProfilePicture } from "@components/ProfilePicture";

import styles from "./Option.module.css";

const CompanyOption = ({ _id, name, email }: any) => {
  return (
    <>
      <div>
        <ProfilePicture _id={_id} size="extra-small" variant="user" />
      </div>

      <div className={styles.flexShrink}>
        <p className={styles.name}>{name}</p>
        <p className={styles.email}>{email}</p>
      </div>
    </>
  );
};

export default CompanyOption;
