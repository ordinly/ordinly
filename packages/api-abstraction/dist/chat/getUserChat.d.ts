export declare type ChatType = {
    messages: {
        from: string;
        repliesTo?: string;
        createdAt: Date;
        updatedAt?: Date;
        deletedAt?: Date;
        message: string;
    }[];
};
export declare type GetUserChatArgs = {
    companyId: string;
    userId: string;
    page: number;
};
export declare type GetUserChatResponse = {
    chat: ChatType;
};
export declare const getUserChat: ({ companyId, userId, page, }: GetUserChatArgs) => Promise<any>;
