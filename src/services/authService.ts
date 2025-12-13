import { LoginInput } from "@/types/auth";
import { apiFetch, IResponse } from "./client";




export interface LoginResponse {
    token: string;
}
        loadingMessage: 'Fetching users...'

// export interface IFunProps<T> {
//     onSuccess?: (res: T) => void;
//     onError?: (err: Error) => void;
// }

export async function loginApi(data: LoginInput): Promise<IResponse<LoginResponse>> {
    return apiFetch("/api/auth/login", {
        method: "POST",
        loadingMessage: 'Fetching...',
        body: data,
    });
}