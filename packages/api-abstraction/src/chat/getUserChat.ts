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

export type GetUserChatArgs = {
  companyId: string;
  userId: string;
  page: number;
};

export type GetUserChatResponse = {
  chat: ChatType;
};

export const getUserChat = async ({
  companyId,
  userId,
  page,
}: GetUserChatArgs) => {
  try {
    const response = await GET<GetUserChatResponse>({
      endpoint: `/chat/company/${companyId}/user/${userId}?page=${page}`,
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
