import { Tile } from "@components/Tile";
import { ProfilePicture } from "@components/ProfilePicture";
import { Status } from "@components/Status";

import formatDate from "@util/formatDate";

import styles from "./CompanyTile.module.css";

import type { CompanyTileProps } from "./types";

const CompanyTile = ({ onClick, ...company }: CompanyTileProps) => {
  const { _id, name, description, pending, createdAt, addedOn } = company;

  return (
    <Tile id={_id} onClick={onClick}>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <ProfilePicture _id={_id} variant="company" size="medium" />

          <div className={styles.contentContainer}>
            <h4 className={styles.title}>{name}</h4>

            <h5 className={styles.dates}>
              Added on:{" "}
              {createdAt
                ? formatDate(createdAt)
                : addedOn
                ? formatDate(addedOn)
                : null}
            </h5>
          </div>
        </div>

        <div>
          <Status variant={pending ? "Pending" : "Active"} />
        </div>
      </div>
    </Tile>
  );
};

export default CompanyTile;
