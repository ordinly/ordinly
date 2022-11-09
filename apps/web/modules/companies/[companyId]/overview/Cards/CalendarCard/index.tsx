import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Card } from "@components/Card";
import { Calendar } from "@components/Calendar";

import CompanyContext from "@contexts/CompanyContext";

import { getCompanyEvents } from "@ordinly/api-abstraction";

import styles from "./CalendarCard.module.css";

const CalendarCard = () => {
  const [events, setEvents] = useState([]);

  const { company } = useContext(CompanyContext);

  const router = useRouter();

  const onChangeMonth = async ({ start, end }) => {
    if (router.query["companyId"]) {
      const { events: newEvents } = await getCompanyEvents({
        companyId: router.query["companyId"] as string,
        start,
        end,
      });

      setEvents(
        newEvents.map(({ start, ...rest }) => ({
          ...rest,
          start: new Date(start),
        }))
      );
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Company calendar">
        <Calendar
          events={events}
          onChangeMonth={onChangeMonth}
          onDateClick={(value) => console.log(value)}
          onEventDrop={async (value, event) => {
            const { _id } = event;
            console.log(event);
            setEvents(
              events.map((event) =>
                _id === event._id
                  ? {
                      ...event,
                      start: value,
                    }
                  : event
              )
            );
          }}
        />
      </Card>
    </div>
  );
};

export default CalendarCard;
