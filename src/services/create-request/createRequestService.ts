import { apiFetch, IResponse } from "../client";
import { ICreateRequestPayload } from "@/models/createRequest";

export async function createRequestApi(data: ICreateRequestPayload): Promise<IResponse<any>> {
    return apiFetch("/aci/request/create", {
        method: "POST",
        body: data,
        requiredToken: true,
    });
}
