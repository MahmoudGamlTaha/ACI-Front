import { UserRegistration } from "@/models/auth";
import { apiFetch, IResponse } from "../client";

export async function RegistrationApi(data: UserRegistration): Promise<IResponse<UserRegistration>> {
    const formData = new FormData();
    const { attachment, ...jsonData } = data;

    formData.append("user", JSON.stringify(jsonData));

    if (attachment) {
        formData.append("file", attachment);
    }

    return apiFetch("/aci/user/create-with-file", {
        method: "POST",
        // requiredToken: true,
        body: formData,      
    });
}
