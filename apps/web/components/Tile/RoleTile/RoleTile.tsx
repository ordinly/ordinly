import { useRouter } from "next/router";

import { Tile } from "@components/Tile";
import { Pill } from "@components/Pill";

import styles from "./RoleTile.module.css";

import type { RoleTileProps } from "./types";

const RoleTile = ({ _id, name, description }: RoleTileProps) => {
  const router = useRouter();

  const onRoleClick = () => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        "role-details": true,
        "role-id": _id,
      },
    });
  };

  return (
    <Tile id={_id} onClick={onRoleClick}>
      <div className={styles.container}>
        <div className={styles.text}>
          <div className={styles.contentContainer}>
            <h4 className={styles.title}>{name}</h4>

            <p>{description}</p>
          </div>
        </div>

        <div className={styles.info}>
          {/*
          <Pill
            icon="project"
            text={numberOfProjects.toString()}
            htmlTitle="# of projects"
          />

          <Pill
            icon="project"
            text={numberOfTasks.toString()}
            htmlTitle="# of tasks"
          />
          */}
        </div>
      </div>
    </Tile>
  );
};

export default RoleTile;
