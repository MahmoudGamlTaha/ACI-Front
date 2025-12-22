import { apiFetch, IResponse } from "../client";

export async function UpdateUserStatus(userId: number, status: string): Promise<IResponse<any>> {
    return apiFetch(`/aci/user/update-status`, {
        method: "POST",
        body: { userId, status },
        requiredToken: true,
    });
}
