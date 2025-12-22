export interface LoginInput {
    email: string
    password: string
}

export interface UserAuthority {
    authority: string;
}

export interface FinancialDetail {
    bankName: string;
    referenceBank: string;
    swiftCode: string;
    accountNumber: string;
    ibanNumber: string;
}

export interface UserRegistration {
    id: number;
    createdAt: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
    fullName: string;
    email: string;
    passwordHash: string;
    password: string;
    username: string;
    userType: "importer" | "exporter" | "admin";
    phone: string;
    active: boolean;
    enabled: boolean;
    isLoggedOut: boolean;
    countryName: string;
    companyName: string;
    address: string;
    comRegister: string;
    taxNumber: string;
    accountNumber: string;
    activityType?: string;
    commissionerName?: string;
    statNumber?: string;
    companyLicense?: string;
    attachment?: string;
    failedLoginCount?: number;
    lastLoginDate?: string;
    userPreferredLanguage?: string;
    registrationStatus: "PENDING" | "APPROVED" | "REJECTED";
    credentialsNonExpired?: boolean;
    accountNonExpired?: boolean;
    accountNonLocked?: boolean;
    authorities?: UserAuthority[];
    financialDetails?: FinancialDetail[];
}



export interface AuthResponse {
    id?: number;
    email: string;
    token: string;
    expireIn: string; // ISO date string
    userType: "admin" | "user"; // extend if you have more roles
}





