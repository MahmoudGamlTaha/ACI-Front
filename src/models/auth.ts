export interface LoginInput {
    email: string
    password: string
}

export interface RegisterInput {
    companyNameAr: string,
    companyNameEn: string,
    idNumber: string,
    statisticalCode: string,
    responsibleNameAr: string,
    fullName: string,
    phoneNumber: string,
    gender: string,
    dateOfBirth: string,
    address: string,
    city: string,
    state: string,
    country: string,
    zipCode: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    acceptTerms?: boolean,
}

export interface UserAuthority {
    authority: string;
}

export interface RegisterResponse {
    id: number;
    createdAt: string;
    updatedAt: string | null;
    createdBy: string | null;
    updatedBy: string | null;

    fullName: string;
    email: string;
    passwordHash: string;
    password: string;

    username: string;
    userType: "importer" | "exporter" | string;
    phone: string;

    active: boolean;
    enabled: boolean;
    isLoggedOut: boolean;

    countryName: string | null;
    companyName: string | null;
    address: string | null;

    comRegister: string | null;
    taxNumber: string | null;
    accountNumber: string | null;
    activityType: string | null;
    commissionerName: string | null;
    statNumber: string | null;
    companyLicense: string | null;
    attachment: string | null;

    failedLoginCount: number;
    lastLoginDate: string | null;
    userPreferredLanguage: string | null;

    registrationStatus: "PENDING" | "APPROVED" | "REJECTED" | string;

    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;

    authorities: UserAuthority[];
}




export interface AuthResponse {
    email: string;
    token: string;
    expireIn: string; // ISO date string
    userType: "admin" | "user"; // extend if you have more roles
}


export interface UserRegistration {
    fullName: string;
    email: string;
    passwordHash: string;
    userType: "importer" | "exporter" | string;
    phone: string;
    countryName: string;
    companyName: string;
    taxNumber: string;
    address: string;
    registrationStatus: "PENDING" | "APPROVED" | "REJECTED";
}
