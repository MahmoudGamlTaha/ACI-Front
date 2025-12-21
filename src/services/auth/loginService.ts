import { AuthResponse, LoginInput } from "@/models/auth";
import { apiFetch, IResponse } from "../client";

export async function loginApi(data: LoginInput): Promise<IResponse<AuthResponse>> {
    return apiFetch("/aci/api/auth/login", {
        method: "POST",
        body: data,
    });
}
