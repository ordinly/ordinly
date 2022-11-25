import type { APIResponse } from "./";
type PUTProps = {
    endpoint: string;
    body?: {
        [key: string]: any;
    };
};
declare const PUT: <T = {}>({ endpoint, body, }: PUTProps) => Promise<APIResponse & T>;
export default PUT;
