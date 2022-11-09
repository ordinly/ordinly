import { useContext } from "react";

import { useRouter } from "next/router";

import { Tile } from "@components/Tile";
import { ProfilePicture } from "@components/ProfilePicture";
import { Icon } from "@components/Icon";
import { RichTextEditor } from "@components/RichTextEditor";

import styles from "./ClientTile.module.css";

import type { ClientTileProps } from "./types";

const ClientTile = ({
  _id,
  companyId,
  name,
  description,
  projects,
  contacts,
}: ClientTileProps) => {
  const router = useRouter();

  const onCardClick = () => {
    router.push({
      pathname: `${router.pathname}/[clientId]/overview`,
      query: {
        ...router.query,
        clientId: _id,
      },
    });
  };

  const onProjectsTagClick = (event) => {
    event.stopPropagation();

    router.push({
      pathname: `${router.pathname}/[clientId]/projects`,
      query: {
        ...router.query,
        clientId: _id,
      },
    });
  };

  const onContactsTagClick = (event) => {
    event.stopPropagation();

    router.push({
      pathname: `${router.pathname}/[clientId]/contacts`,
      query: {
        ...router.query,
        clientId: _id,
      },
    });
  };

  return (
    <Tile id={companyId} onClick={onCardClick}>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          {companyId ? <ProfilePicture _id={companyId} /> : null}

          <div className={styles.text}>
            <div>
              <h4 className={styles.title}>{name}</h4>

              <RichTextEditor readOnly fixed value={description} />
            </div>
          </div>
        </div>

        <div className={styles.tagsContainer}>
          <div
            className={styles.tag}
            style={{
              color: "var(--not-started-status-color)",
              backgroundColor: "var(--background-color)",
            }}
            onClick={onProjectsTagClick}
          >
            <Icon icon="project" />
            <span className={styles.tagNumber}>{projects?.length}</span>
          </div>

          <div
            className={styles.tag}
            style={{
              color: "var(--not-started-status-color)",
              backgroundColor: "var(--background-color)",
            }}
            onClick={onContactsTagClick}
          >
            <Icon icon="contacts" />
            <span className={styles.tagNumber}>{contacts?.length}</span>
          </div>
        </div>
      </div>
    </Tile>
  );
};

export default ClientTile;
