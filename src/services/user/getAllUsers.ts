import { RegisterResponse } from "@/models/auth";
import { PaginatedResponse } from "@/models/users";
import { apiFetch, IResponse } from "../client";

export async function GetAllUsers(): Promise<IResponse<PaginatedResponse<RegisterResponse>>> {
    return apiFetch(`/aci/user/findAll`, {
        method: "GET",
        requiredToken: true,
    });
}
