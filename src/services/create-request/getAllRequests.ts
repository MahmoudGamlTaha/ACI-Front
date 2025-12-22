import { PaginatedResponse } from "@/models/users";
import { apiFetch, IResponse } from "../client";
import { ICreateRequestPayload } from "@/models/createRequest";

export async function getAllRequests(): Promise<IResponse<PaginatedResponse<ICreateRequestPayload>>> {
    return apiFetch("/aci/request/user-requests", {
        method: "GET",
        requiredToken: true,
    });
}
