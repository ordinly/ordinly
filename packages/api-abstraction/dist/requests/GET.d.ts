import type { APIResponse } from "./";
declare type GETProps = {
    endpoint: string;
    type?: string;
    queryParams?: {
        [key: string | number]: string | number | string[] | number[];
    };
};
declare const GET: <T = {}>({ endpoint, type, queryParams, }: GETProps) => Promise<any>;
export default GET;
