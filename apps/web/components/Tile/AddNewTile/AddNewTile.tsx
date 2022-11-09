import { Icon } from "@components/Icon";

import styles from "./AddNewTile.module.css";

import type { AddNewTileProps } from "./types";

const AddNewTile = ({
  id,
  type,
  icon,
  onClick,
  singular = true,
  text,
}: AddNewTileProps) => {
  return (
    <div className={styles.container}>
      <div id={id} className={styles.tile} onClick={onClick}>
        <div className={styles.icon}>
          <Icon icon={icon} />
        </div>

        <div>
          {text ? (
            <p className={styles.title}>{text}</p>
          ) : (
            <>
              <p className={styles.title}>Add {singular ? "a" : ""} new</p>
              <p className={styles.title}>
                {type}
                {singular ? "" : "s"}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNewTile;
