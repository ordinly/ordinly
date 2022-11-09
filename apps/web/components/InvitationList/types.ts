export type InvitationListProps = {
  invitations: {
    _id: string;
    to: {
      company: string;
    };
    from: {
      user?: { _id: string; name: string };
      company?: { _id: string; name: string; description: string };
      project?: { _id: string; name: string; description: string };
    };
  }[];
};
