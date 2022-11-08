import { GET } from "../requests";

export type UpdateChatReadArgs = {
  chatId: string;
  companyId: string;
};

export const updateChatRead = async ({
  companyId,
  chatId,
}: UpdateChatReadArgs) => {
  try {
    const response = await GET({
      endpoint: `/chat/company/${companyId}/chat/${chatId}/update-read`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error updating the chat's read date",
    } = caught;

    return { status, error };
  }
};
