import { Event } from "@db/schedulerAPIConnection/schemas/Event";

import type { EventType } from "@db/schedulerAPIConnection/schemas/Event";

type UpdateEventProps = EventType & { _id: string };

const updateEvent = async (props: UpdateEventProps) => {
  try {
    const event = await Event.update(props);

    return event;
  } catch (caught: any) {
    throw caught;
  }
};

export { updateEvent };
