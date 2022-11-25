import type { APIResponse } from "./";
type DELETEProps = {
    endpoint: string;
};
declare const DELETE: ({ endpoint }: DELETEProps) => Promise<APIResponse>;
export default DELETE;
