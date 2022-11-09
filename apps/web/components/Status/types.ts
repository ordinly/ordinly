export type StatusVariants =
  | "Proposal"
  | "Not started"
  | "On hold"
  | "In progress"
  | "Complete"
  | "Cancelled"
  | "Rejected"
  | "Pending"
  | "Active";

export type StatusProps = {
  variant: StatusVariants;
};
