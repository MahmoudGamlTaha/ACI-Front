import { apiFetch, IResponse } from "../client";

export async function ApproveUser(userId: number): Promise<IResponse<any>> {
    return apiFetch(`/aci/user/admin/approve/${userId}`, {
        method: "POST",
        requiredToken: true,
    });
}
