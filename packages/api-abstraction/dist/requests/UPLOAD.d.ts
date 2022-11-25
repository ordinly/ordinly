import type { APIResponse } from "./";
type UPLOADProps = {
    action?: "POST" | "PUT";
    endpoint: string;
    body?: {
        [key: string]: any;
    };
};
declare const UPLOAD: <T = {}>({ action, endpoint, body, }: UPLOADProps) => Promise<APIResponse & T>;
export default UPLOAD;
