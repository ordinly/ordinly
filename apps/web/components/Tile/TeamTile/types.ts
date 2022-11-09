import type { Team } from "@ordinly/api-abstraction/companies/getCompany";

export type TeamTileProps = Team & { numberOfMembers: number };
