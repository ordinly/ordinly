type ResponseProps = {
  invitationId: string;
};

export type InvitationTileProps = {
  id?: string;
  userName: string;
  companyName: string;
  image?: string;
  onAcceptInvitation: (props: ResponseProps) => void;
  onDeclineInvitation: (props: ResponseProps) => void;
};
