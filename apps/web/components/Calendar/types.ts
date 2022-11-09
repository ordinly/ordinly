export type EventProps = {
  _id: string;
  name: string;
  start: Date;
  end?: Date;
  startsToday: boolean;
  endsToday: boolean;
};

export type CalendarProps = {
  events: EventProps[];
  onChangeMonth?: ({ start, end }: { start: Date; end: Date }) => void;
  onDateClick?: (date: Date) => void;
  onEventDrop?: (newDate: Date, event: EventProps) => void;
};

export type DateProps = {
  date: {
    date: Date;
    events: EventProps[];
  };
  onClick?: () => void;
  onEventDrop?: (newDate: Date, event: EventProps) => void;
  selected: boolean;
  notInMonth: boolean;
};
