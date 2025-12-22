import { ICountsApi } from "@/models/createRequest";
import { apiFetch, IResponse } from "../client";

export async function GetRequestCounts(): Promise<IResponse<ICountsApi>> {
    return apiFetch("/aci/request/count", {
        method: "GET",
        requiredToken: true,
    });
}
