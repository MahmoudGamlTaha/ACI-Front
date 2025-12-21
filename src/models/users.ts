export interface UserRequest {
    id: number;
    page: number;
    limit: number;
    sortBy: string;
    sortDirection: "ASC" | "DESC";
}

export interface SortInfo {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export interface Pageable {
    sort: SortInfo;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface IUserRequestPayload {
id: number;
fullName: string;
companyName: string;    
}

export interface PaginatedResponse<T> {
    content: T[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: SortInfo;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}
