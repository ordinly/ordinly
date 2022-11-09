import type { PriorityVariants } from "@components/Priority";
import type { StatusVariants } from "@components/Status";

export type TaskTileProps = {
  _id: string;
  name: string;
  description: string;
  dueDate?: Date;
  status: StatusVariants;
  priority: PriorityVariants;
  startDate: Date;
  checklist: any[];
  onClick?: () => void;
};
