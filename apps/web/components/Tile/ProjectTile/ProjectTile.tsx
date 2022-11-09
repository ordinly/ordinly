import { useRouter } from "next/router";

import { Tile } from "@components/Tile";
import { ProgressBar } from "@components/ProgressBar";
import { RichTextEditor } from "@components/RichTextEditor";
import { Priority } from "@components/Priority";
import { Status } from "@components/Status";

import formatDate from "@util/formatDate";

import styles from "./ProjectTile.module.css";

import type { ProjectTileProps } from "./types";

import type { PriorityVariants } from "@components/Priority";
import type { StatusVariants } from "@components/Status";

const ProjectTile = ({
  _id,
  name,
  description,
  tasks,
  priority,
  status,
  startDate,
  dueDate,
  onClick,
}: ProjectTileProps) => {
  const percent = tasks?.total
    ? Math.round((tasks.complete / tasks.total) * 100)
    : 0;

  return (
    <Tile id={_id} onClick={onClick}>
      <div className={styles.container}>
        <div className={styles.text}>
          <div className={styles.contentContainer}>
            <h4 className={styles.title}>{name}</h4>

            <h5 className={styles.dates}>
              {startDate ? formatDate(startDate) : null}
              {dueDate ? ` - ${formatDate(dueDate)}` : null}
            </h5>

            <RichTextEditor readOnly fixed value={description} />
          </div>
        </div>

        <div>
          {priority ? (
            <Priority variant={priority as PriorityVariants} />
          ) : null}

          {status ? <Status variant={status as StatusVariants} /> : null}
        </div>

        {tasks?.total ? <ProgressBar percent={percent} /> : null}
      </div>
    </Tile>
  );
};

export default ProjectTile;
