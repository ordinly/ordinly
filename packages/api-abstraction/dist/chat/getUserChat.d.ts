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
export declare const getUserChat: ({ companyId, userId, page, }: GetUserChatArgs) => Promise<any>;
