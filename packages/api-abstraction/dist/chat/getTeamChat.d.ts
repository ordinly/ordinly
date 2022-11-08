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
export declare type GetTeamChatArgs = {
    companyId: string;
    teamId: string;
};
export declare type GetTeamChatResponse = {
    chat: ChatType;
};
export declare const getTeamChat: ({ companyId, teamId }: GetTeamChatArgs) => Promise<any>;
