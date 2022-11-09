import type { Role } from "@ordinly/api-abstraction";

export type WorkerTileProps = {
  _id: string;
  title: string;
  role?: Role;
  status: string;
  name: string;
  joined: Date;
  image?: string;
  email: string;
  numberOfProjects?: number;
  numberOfTasks?: number;
  numberOfTeams: number;
  onClick: () => void;
  userId: string;
};
