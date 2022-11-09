import { useRouter } from "next/router";

import { Tile } from "@components/Tile";
import { ProgressBar } from "@components/ProgressBar";
import { Status } from "@components/Status";
import { Priority } from "@components/Priority";
import { RichTextEditor } from "@components/RichTextEditor";

import formatDate from "@util/formatDate";

import styles from "./TaskTile.module.css";

import type { TaskTileProps } from "./types";

const TaskTile = ({
  _id,
  name,
  description,
  status,
  priority,
  startDate,
  dueDate,
  checklist,
  onClick,
}: TaskTileProps) => {
  const router = useRouter();

  const percent = checklist?.length
    ? Math.round(
        (checklist.filter(({ complete }) => complete).length /
          checklist.length) *
          100
      )
    : 0;

  return (
    <Tile id={_id} onClick={onClick}>
      <div className={styles.container}>
        <div className={styles.text}>
          <div className={styles.contentContainer}>
            <h4 className={styles.title}>{name}</h4>

            {startDate || dueDate ? (
              <h5 className={styles.dates}>
                {startDate ? formatDate(startDate) : "N/A"} -{" "}
                {dueDate ? formatDate(dueDate) : "N/A"}
              </h5>
            ) : null}

            <RichTextEditor value={description} readOnly />
          </div>
        </div>

        <div>
          {priority ? <Priority variant={priority} /> : null}

          {status ? <Status variant={status} /> : null}
        </div>

        {checklist?.length ? <ProgressBar percent={percent} /> : null}
      </div>
    </Tile>
  );
};

export default TaskTile;
