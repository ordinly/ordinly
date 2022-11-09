import type { Role } from "@ordinly/api-abstraction/companies/getCompany";

export type RoleTileProps = Role & { onClick: () => void };
