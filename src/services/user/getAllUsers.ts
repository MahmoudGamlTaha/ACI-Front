import { PaginatedResponse } from "@/models/users";
import { apiFetch, IResponse } from "../client";
import { UserRegistration } from "@/models/auth";

export async function GetAllUsers(): Promise<IResponse<PaginatedResponse<UserRegistration>>> {
    return apiFetch(`/aci/user/findAll`, {
        method: "GET",
        requiredToken: true,
    });
}
