import { PaginatedResponse } from "@/models/users";
import { apiFetch, IResponse } from "../client";
import { CountryResponse } from "@/models/loockup";

export async function GetAllCountries(): Promise<IResponse<PaginatedResponse<CountryResponse>>> {
    return apiFetch(`/aci/country/findAll`, {
        method: "GET",
        requiredToken: true,
    });
}
