import { useEffect, useState } from "react";

import { useDrag } from "react-dnd";

import styles from "./Event.module.css";

import { EventProps } from "../types";

const Event = ({ name, startsToday, endsToday, ...restProps }: EventProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "Event",
    item: { ...restProps, name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <>
      <p
        ref={drag}
        className={`${styles.event} ${isDragging ? styles.dragging : ""} ${
          !startsToday ? styles.continuousLeft : ""
        } ${!endsToday ? styles.continuousRight : ""}`}
        style={{
          width: `calc(100% + ${
            (!startsToday ? 1 : 0) + (!endsToday ? 1 : 0)
          }px`,
          borderRadius: `${startsToday ? "var(--border-radius-small)" : 0} ${
            endsToday ? "var(--border-radius-small)" : 0
          } ${endsToday ? "var(--border-radius-small)" : 0} ${
            startsToday ? "var(--border-radius-small)" : 0
          }`,
        }}
      >
        {startsToday ? name : ""}
      </p>
    </>
  );
};

export default Event;
