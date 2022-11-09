import { ProfilePicture } from "@components/ProfilePicture";

import styles from "./Selected.module.css";

const Company = ({ _id, name }: any) => {
  return (
    <div className={styles.company}>
      <div>
        <ProfilePicture _id={_id} size="small" />
      </div>

      <div className={styles.flexShrink}>
        <h4 className={styles.title}>{name}</h4>
      </div>
    </div>
  );
};

export default Company;
