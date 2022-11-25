import type { APIResponse } from "./";
type POSTProps = {
    endpoint: string;
    body?: {
        [key: string]: any;
    };
};
declare const POST: <T = {}>({ endpoint, body, }: POSTProps) => Promise<APIResponse & T>;
export default POST;
