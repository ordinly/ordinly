export type ProjectTileProps = {
  _id: string;
  name: string;
  description?: string;
  tasks: { total: number; complete: number };
  priority: string;
  status: string;
  startDate: Date;
  dueDate: Date;
  onClick?: () => void;
};
