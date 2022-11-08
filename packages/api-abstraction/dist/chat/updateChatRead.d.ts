export declare type UpdateChatReadArgs = {
    chatId: string;
    companyId: string;
};
export declare const updateChatRead: ({ companyId, chatId, }: UpdateChatReadArgs) => Promise<any>;
