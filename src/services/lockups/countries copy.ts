import { PaginatedResponse } from "@/models/users";
import { apiFetch, IResponse } from "../client";
import { PortResponse } from "@/models/loockup";

export async function GetAllPorts(): Promise<IResponse<PaginatedResponse<PortResponse>>> {
    return apiFetch(`/aci/port/findAll`, {
        method: "GET",
        requiredToken: true,
    });
}
