import { Event } from "@db/schedulerAPIConnection/schemas/Event";

type RemoveEventProps = { _id: string };

const removeEvent = async ({ _id }: RemoveEventProps) => {
  try {
    await Event.remove({ _id });
  } catch (caught: any) {
    throw caught;
  }
};

export { removeEvent };
