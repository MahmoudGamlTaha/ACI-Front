import { LoginInput } from "@/models/auth";
import { apiFetch, IResponse } from "../client";
import { AuthResponse } from "./types";

export async function loginApi(data: LoginInput): Promise<IResponse<AuthResponse>> {
    return apiFetch("/aci/api/auth/login", {
        method: "POST",
        loadingMessage: 'Logging in...',
        body: data,
    });
}
