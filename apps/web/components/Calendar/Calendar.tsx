import { useEffect, useState } from "react";

import { useDrag } from "react-dnd";

import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
  isSameMonth,
  subMonths,
  addMonths,
  isSameDay,
  isWithinInterval,
} from "date-fns";

import { Button } from "@components/Button";

import DateCell from "./DateCell";

import styles from "./Calendar.module.css";

import { CalendarProps } from "./types";

const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const Calendar = ({
  events,
  onDateClick,
  onEventDrop,
  onChangeMonth,
}: CalendarProps) => {
  const [selectedMonth, setSelectedMonth] = useState(startOfMonth(new Date()));
  const [monthString, setMonthString] = useState("");
  const [weeks, setWeeks] = useState([]);

  const [selectedDate, setSelectedDate] = useState(undefined);

  useEffect(() => {
    const weeksInMonth = eachWeekOfInterval({
      start: startOfMonth(selectedMonth),
      end: endOfMonth(selectedMonth),
    });

    setMonthString(
      selectedMonth.toLocaleString(navigator?.languages[0], {
        month: "long",
      })
    );

    const newWeeks = weeksInMonth.map((start) =>
      eachDayOfInterval({
        start,
        end: endOfWeek(start),
      }).map((date) => ({
        date,
        events: events.filter(({ start: eventStart, end: eventEnd }) => {
          if (eventStart && eventEnd) {
            return (
              isSameDay(date, eventStart) ||
              isWithinInterval(date, {
                start: new Date(eventStart),
                end: new Date(eventEnd),
              })
            );
          }
        }),
      }))
    );

    setWeeks(newWeeks);

    if (!selectedDate) {
      for (let i = 0; i < newWeeks.length; i++) {
        const daysInWeek = newWeeks[i];

        for (let j = 0; j < daysInWeek.length; j++) {
          if (isSameDay(new Date(), daysInWeek[j].date)) {
            setSelectedDate(daysInWeek[j].date);
          }
        }
      }
    }
  }, [selectedMonth, events]);

  const onNextMonthClick = () => {
    setSelectedMonth(addMonths(selectedMonth, 1));
  };

  const onPreviousMonthClick = () => {
    setSelectedMonth(subMonths(selectedMonth, 1));
  };

  useEffect(() => {
    onChangeMonth({
      start: startOfMonth(selectedMonth),
      end: endOfMonth(selectedMonth),
    });
  }, [selectedMonth]);

  return (
    <div>
      <div className={styles.header}>
        <div>
          <Button icon="chevron-left" onClick={onPreviousMonthClick} />
        </div>

        <h3 className={styles.title}>
          {monthString} {selectedMonth.getFullYear()}
        </h3>

        <div>
          <Button icon="chevron-right" onClick={onNextMonthClick} />
        </div>
      </div>

      <table className={styles.container}>
        <tr className={styles.headerRow}>
          {days.map((day) => (
            <th className={styles.headerCell}>{day}</th>
          ))}
        </tr>

        {weeks.map((week, weekIndex) => (
          <tr>
            {week.map((date, dayIndex) => {
              const notInMonth = !isSameMonth(date.date, selectedMonth);

              return (
                <DateCell
                  date={date}
                  selected={date.date === selectedDate}
                  notInMonth={notInMonth}
                  onClick={() => {
                    if (onDateClick) {
                      const newSelectedDate = weeks[weekIndex][dayIndex];

                      onDateClick(newSelectedDate);

                      setSelectedDate(newSelectedDate.date);
                    }
                  }}
                  onEventDrop={onEventDrop}
                />
              );
            })}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Calendar;
