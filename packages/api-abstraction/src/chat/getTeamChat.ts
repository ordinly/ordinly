import { GET } from "../requests";

export type ChatType = {
  messages: {
    from: string;
    repliesTo?: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    message: string;
  }[];
};

export type GetTeamChatArgs = {
  companyId: string;
  teamId: string;
};

export type GetTeamChatResponse = {
  chat: ChatType;
};

export const getTeamChat = async ({ companyId, teamId }: GetTeamChatArgs) => {
  try {
    const response = await GET<GetTeamChatResponse>({
      endpoint: `/chat/company/${companyId}/team/${teamId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching your chat",
    } = caught;

    return { status, error };
  }
};
