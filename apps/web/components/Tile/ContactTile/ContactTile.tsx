import { useContext } from "react";

import { useRouter } from "next/router";

import { Tile } from "@components/Tile";

import styles from "./ContactTile.module.css";

import type { ContactTileProps } from "./types";

const ContactTile = ({
  _id,
  name,
  email,
  description,
  phoneNumber,
  onClick,
}: ContactTileProps) => {
  const router = useRouter();

  return (
    <Tile id={_id} onClick={onClick}>
      <div className={styles.container}>
        <div className={styles.text}>
          <div>
            <h4 className={styles.title}>{name}</h4>

            <p>{description}</p>

            <p className={styles.description}>
              <span className={styles.bold}>Email: </span>
              {email || "N/A"}
            </p>

            <p className={styles.description}>
              <span className={styles.bold}>Phone number: </span>
              {phoneNumber || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </Tile>
  );
};

export default ContactTile;
