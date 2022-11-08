export declare type Tag = {
    label: string;
    color: string;
};
export declare type GetTagsResponse = {
    tags: Tag[];
};
export declare const getAllTags: () => Promise<any>;
