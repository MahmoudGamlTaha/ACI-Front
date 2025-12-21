import { RegisterResponse, UserRegistration } from "@/models/auth";
import { apiFetch, IResponse } from "../client";

export async function RegistrationApi(data: UserRegistration): Promise<IResponse<RegisterResponse>> {
    return apiFetch("/aci/user/create", {
        method: "POST",
        body: data,
    });
}
