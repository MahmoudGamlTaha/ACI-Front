import { PaginatedResponse } from "@/models/users";
import { apiFetch, IResponse } from "../client";
import { ICreateRequestPayload } from "@/models/createRequest";

export async function ApproveRequest(requestId: number): Promise<IResponse<PaginatedResponse<ICreateRequestPayload>>> {
    return apiFetch(`/aci/request/approve/${requestId}`, {
        method: "POST",
        requiredToken: true,
    });
}

export async function RejectRequest(requestId: number): Promise<IResponse<PaginatedResponse<ICreateRequestPayload>>> {
    return apiFetch(`/aci/request/reject/${requestId}`, {
        method: "POST",
        requiredToken: true,
    });
}
