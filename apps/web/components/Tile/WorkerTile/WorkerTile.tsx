import { useRouter } from "next/router";

import formatDate from "@util/formatDate";

import { Tile } from "@components/Tile";
import { ProfilePicture } from "@components/ProfilePicture";

import styles from "./WorkerTile.module.css";

import type { WorkerTileProps } from "./types";

const WorkerTile = ({
  _id,
  name,
  status,
  joined,
  email,
  userId,
}: WorkerTileProps) => {
  const router = useRouter();

  const onClick = () =>
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        "update-worker": true,
        "worker-id": _id,
      },
    });

  return (
    <Tile id={_id} onClick={onClick}>
      <div className={styles.container}>
        {userId ? (
          <div>
            <ProfilePicture variant="user" _id={userId} />
          </div>
        ) : null}

        <div className={styles.contentContainer}>
          <div className={styles.infoContainer}>
            <h4 className={styles.title}>{name || "Worker without account"}</h4>
            {joined ? (
              <h5 className={styles.joined}>Since {formatDate(joined)}</h5>
            ) : null}

            <p className={styles.info}>
              <span className={styles.bold}>Email:</span> {email}
            </p>
          </div>

          <div>
            <div className={`${styles.tag} ${styles[status]}`}>{status}</div>
          </div>
        </div>
      </div>
    </Tile>
  );
};

export default WorkerTile;
