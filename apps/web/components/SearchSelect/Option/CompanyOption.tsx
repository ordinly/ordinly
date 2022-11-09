import { ProfilePicture } from "@components/ProfilePicture";

import styles from "./Option.module.css";

const CompanyOption = ({ _id, name, description }: any) => {
  return (
    <>
      <div>
        <ProfilePicture _id={_id} size="extra-small" />
      </div>

      <div className={styles.flexShrink}>
        <p className={styles.name}>{name}</p>

        <p className={styles.description}>{description}</p>
      </div>
    </>
  );
};

export default CompanyOption;
