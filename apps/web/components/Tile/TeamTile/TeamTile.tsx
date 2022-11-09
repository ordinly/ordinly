import { useRouter } from "next/router";

import { Tile } from "@components/Tile";
import { Icon } from "@components/Icon";

import styles from "./TeamTile.module.css";

import type { TeamTileProps } from "./types";

const TeamTile = ({ _id, name, description, members }: TeamTileProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, "update-team": true, "team-id": _id },
    });
  };

  return (
    <Tile id={_id} onClick={onClick}>
      <div className={styles.container}>
        <div className={styles.text}>
          <div className={styles.contentContainer}>
            <h4 className={styles.title}>{name}</h4>

            <p>{description}</p>
          </div>
        </div>

        <div className={styles.info}>
          <div
            className={styles.tag}
            style={{
              color: "var(--not-started-status-color)",
              backgroundColor: "var(--background-color)",
            }}
          >
            <Icon icon="workers" />
            <span className={styles.tagNumber}>{members?.length}</span>
          </div>
        </div>
      </div>
    </Tile>
  );
};

export default TeamTile;
