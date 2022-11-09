import { Event } from "@db/schedulerAPIConnection/schemas/Event";

import type { EventType } from "@db/schedulerAPIConnection/schemas/Event";

const addEvent = async (props: EventType) => {
  try {
    const event = await Event.create(props);

    return event;
  } catch (caught: any) {
    throw caught;
  }
};

export { addEvent };
