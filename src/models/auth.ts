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
