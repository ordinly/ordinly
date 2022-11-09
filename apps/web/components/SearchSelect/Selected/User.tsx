import { ProfilePicture } from "@components/ProfilePicture";

import styles from "./Selected.module.css";

const User = ({ _id, name, email }: any) => {
  return (
    <div className={`${styles.company}`}>
      <div>
        <ProfilePicture _id={_id} size="small" variant="user" />
      </div>

      <div className={styles.content}>
        <h4 className={styles.title}>{name}</h4>

        <p className={styles.email}>{email}</p>
      </div>
    </div>
  );
};

export default User;
