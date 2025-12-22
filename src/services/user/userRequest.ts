import { apiFetch, IResponse } from "../client";
import { IUserRequestPayload, PaginatedResponse, UserRequest } from "@/models/users";


export const buildQueryParams = (data: UserRequest) => {
    const params = new URLSearchParams({
        id: String(data.id),
        page: String(data.page),
        limit: String(data.limit),
        sortBy: data.sortBy,
        sortDirection: data.sortDirection,
    });

    return params.toString();
};

export async function GetUsers(): Promise<IResponse<PaginatedResponse<IUserRequestPayload>>> {
    return apiFetch(`/aci/user/clients`, {
        method: "GET",
        requiredToken: true,
    });
}
