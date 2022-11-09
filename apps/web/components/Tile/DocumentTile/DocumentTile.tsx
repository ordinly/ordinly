import { useRouter } from "next/router";

import { Tile } from "@components/Tile";

import styles from "./DocumentTile.module.css";

import type { DocumentTileProps } from "./types";

const DocumentTile = ({
  _id,
  kind,
  issueDate,
  dueDate,
  number,
  total,
  onClick,
}: DocumentTileProps) => {
  return (
    <Tile id={_id} onClick={onClick}>
      <div className={styles.container}>
        <div className={styles.text}>
          <div>
            <h4 className={styles.title}>
              {kind} #{number}
            </h4>
            <p className={styles.description}>
              <span className={styles.bold}>Issue date:</span>{" "}
              {issueDate?.toString()}
            </p>
            <p className={styles.description}>
              <span className={styles.bold}>Due date:</span>{" "}
              {dueDate?.toString()}
            </p>
            <p className={styles.description}>
              <span className={styles.bold}>Total</span> ${total}
            </p>
          </div>
        </div>
      </div>
    </Tile>
  );
};

export default DocumentTile;
