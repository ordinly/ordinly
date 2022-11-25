export type Tag = {
    label: string;
    color: string;
};
export type GetTagsResponse = {
    tags: Tag[];
};
export declare const getAllTags: () => Promise<any>;
