import { useDrop } from "react-dnd";

import { isSameDay } from "date-fns";

import Event from "../Event";

import styles from "./DateCell.module.css";

import { DateProps, EventProps } from "../types";

const DateCell = ({
  date: { date, events },
  onClick,
  onEventDrop,
  selected = false,
  notInMonth = true,
}: DateProps) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "Event",
      drop: (event: EventProps) => onEventDrop && onEventDrop(date, event),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [date]
  );

  return (
    <td
      ref={drop}
      className={`${styles.dateCell} ${notInMonth ? styles.notInMonth : ""} ${
        selected ? styles.selected : ""
      } ${isOver ? styles.isOver : ""}`}
      onClick={onClick}
    >
      <p className={styles.dateNumber}>{date.getDate()}</p>

      {events.map((props) => {
        const startsToday = isSameDay(date, props.start);

        const endsToday = isSameDay(date, props.end);

        return (
          <Event {...props} endsToday={endsToday} startsToday={startsToday} />
        );
      })}
    </td>
  );
};

export default DateCell;
