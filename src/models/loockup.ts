export interface CountryResponse {
    id: number;
    createdAt: string;
    updatedAt: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    code: string;
    name: string;
    nameEn: string;
}

export interface ShipmentTypeResponse {
    id: number;
    createdAt: string;
    updatedAt: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    name: string;
    nameEn: string;
    description: string;
}

export interface PortResponse {
    id: number;
    createdAt: string;        // ISO date string
    updatedAt: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    name: string;
    nameEn: string;
    code: string;
    country: CountryResponse;
}