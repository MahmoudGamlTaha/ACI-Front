import { PaginatedResponse } from "@/models/users";
import { apiFetch, IResponse } from "../client";
import { ShipmentTypeResponse } from "@/models/loockup";

export async function GetShipmentTypes(): Promise<IResponse<PaginatedResponse<ShipmentTypeResponse>>> {
    return apiFetch(`/aci/shipmentType/findAll`, {
        method: "GET",
        requiredToken: true,
    });
}
