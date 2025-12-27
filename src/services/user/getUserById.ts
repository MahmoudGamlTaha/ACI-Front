import { UserRegistration } from "@/models/auth";
import { apiFetch, IResponse } from "../client";

export async function GetUserById(userId: number): Promise<IResponse<UserRegistration>> {
    return apiFetch(`/aci/user/${userId}`, {
        method: "GET",
        requiredToken: true,
    });
}
